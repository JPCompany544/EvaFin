"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// Types for EIP-6963
export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: any;
}

declare global {
  interface Window {
    ethereum?: any;
    trustwallet?: any;
  }
}

export interface Transaction {
  id: string;
  date: string;
  type: "Deposit" | "Withdraw";
  amount: number;
  ethAmount: number;
  status: "Success" | "Pending";
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface AppContextType {
  isWalletConnected: boolean;
  walletAddress: string | null;
  connectWallet: (walletName: string) => Promise<void>;
  disconnectWallet: () => void;
  isConnectModalOpen: boolean;
  setConnectModalOpen: (open: boolean) => void;
  isDepositModalOpen: boolean;
  setDepositModalOpen: (open: boolean) => void;
  portfolioBalance: number;
  ethBalance: number;
  todayEarnings: number;
  roi: number;
  transactions: Transaction[];
  simulateDeposit: (ethAmount: number) => Promise<void>;
  simulateWithdraw: (ethAmount: number) => Promise<void>;
  ethPrice: number;
  isActionLoading: boolean;
  toasts: Toast[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  announcedProviders: EIP6963ProviderDetail[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  // Custom Toasts State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Web3 Provider States
  const [activeProvider, setActiveProvider] = useState<any>(null);
  const [announcedProviders, setAnnouncedProviders] = useState<EIP6963ProviderDetail[]>([]);
  const listenersRef = useRef<{
    provider: any;
    handleAccounts: any;
    handleChain: any;
    handleDisconnect: any;
  } | null>(null);

  // Financial numbers
  const ethPrice = 3250; // $3,250 USD per ETH
  const [ethBalance, setEthBalance] = useState(0.00); // Initial balance is 0.00 (per request: $0.00 portfolio before connection/deposits)
  const [todayEarningsEth, setTodayEarningsEth] = useState(0.00); // Initial earnings in ETH
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const portfolioBalance = ethBalance * ethPrice;
  const todayEarnings = todayEarningsEth * ethPrice;
  const roi = 35.5; // 35.5% APY yield

  // Toast utilities
  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // EIP-6963 Wallet Discovery
  useEffect(() => {
    const handleAnnounce = (event: any) => {
      const detail = event.detail as EIP6963ProviderDetail;
      setAnnouncedProviders((prev) => {
        if (prev.some((p) => p.info.uuid === detail.info.uuid)) return prev;
        return [...prev, detail];
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("eip6963:announceProvider", handleAnnounce);
      window.dispatchEvent(new Event("eip6963:requestProvider"));
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("eip6963:announceProvider", handleAnnounce);
      }
    };
  }, []);

  // Fetch Wallet Balance
  const fetchBalance = async (address: string, provider: any) => {
    try {
      const balanceHex = await provider.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const balanceWei = BigInt(balanceHex);
      const balanceEthVal = Number(balanceWei) / 1e18;
      setEthBalance(balanceEthVal);
    } catch (e) {
      console.error("Failed to fetch balance:", e);
    }
  };

  // Poll balance updates if wallet is connected
  useEffect(() => {
    if (!isWalletConnected || !walletAddress || !activeProvider) return;
    const interval = setInterval(() => {
      fetchBalance(walletAddress, activeProvider);
    }, 8000);
    return () => clearInterval(interval);
  }, [isWalletConnected, walletAddress, activeProvider]);

  // Micro-update loop: Simulate yield accumulating in background when wallet is connected
  useEffect(() => {
    if (!isWalletConnected) return;
    const interval = setInterval(() => {
      setTodayEarningsEth((prev) => prev + 0.0000004);
      setEthBalance((prev) => prev + 0.0000004);
    }, 4000);
    return () => clearInterval(interval);
  }, [isWalletConnected]);

  // Remove existing listeners helper
  const removeListeners = () => {
    if (listenersRef.current) {
      const { provider, handleAccounts, handleChain, handleDisconnect } = listenersRef.current;
      try {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccounts);
          provider.removeListener("chainChanged", handleChain);
          provider.removeListener("disconnect", handleDisconnect);
        }
      } catch (e) {
        console.error("Error removing listeners:", e);
      }
      listenersRef.current = null;
    }
  };

  // Connect Wallet Action
  const connectWallet = async (walletName: string, isAutoConnect = false) => {
    setIsActionLoading(true);
    try {
      let provider: any = null;

      if (walletName === "MetaMask") {
        const discovered = announcedProviders.find((p) => p.info.rdns === "io.metamask");
        if (discovered) {
          provider = discovered.provider;
        } else if (typeof window !== "undefined") {
          if (window.ethereum?.isMetaMask && !window.ethereum?.isTrust) {
            provider = window.ethereum;
          } else if (window.ethereum?.providers) {
            provider = window.ethereum.providers.find((p: any) => p.isMetaMask && !p.isTrust);
          }
        }
      } else if (walletName === "Trust Wallet") {
        const discovered = announcedProviders.find((p) => p.info.rdns === "com.trustwallet.extension");
        if (discovered) {
          provider = discovered.provider;
        } else if (typeof window !== "undefined") {
          if (window.trustwallet) {
            provider = window.trustwallet;
          } else if (window.ethereum?.isTrust) {
            provider = window.ethereum;
          } else if (window.ethereum?.providers) {
            provider = window.ethereum.providers.find((p: any) => p.isTrust);
          }
        }
      }

      if (!provider) {
        if (!isAutoConnect) {
          showToast(`${walletName} extension is not detected. Redirecting to download...`, "error");
          setTimeout(() => {
            window.open(
              walletName === "MetaMask"
                ? "https://metamask.io/download/"
                : "https://trustwallet.com/download/",
              "_blank"
            );
          }, 1500);
        }
        setIsActionLoading(false);
        return;
      }

      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        setIsWalletConnected(true);
        setActiveProvider(provider);
        localStorage.setItem("connected_wallet", walletName);

        await fetchBalance(address, provider);
        
        // Setup Account/Chain Listeners
        removeListeners();
        const handleAccounts = (newAccounts: string[]) => {
          if (newAccounts.length === 0) {
            disconnectWallet();
          } else {
            const nextAddr = newAccounts[0];
            setWalletAddress(nextAddr);
            fetchBalance(nextAddr, provider);
            showToast("Switched active account.", "success");
          }
        };
        const handleChain = () => {
          fetchBalance(address, provider);
          showToast("Network changed.", "info");
        };
        const handleDisconnect = () => {
          disconnectWallet();
        };

        if (provider.on) {
          provider.on("accountsChanged", handleAccounts);
          provider.on("chainChanged", handleChain);
          provider.on("disconnect", handleDisconnect);
        }

        listenersRef.current = {
          provider,
          handleAccounts,
          handleChain,
          handleDisconnect,
        };

        if (!isAutoConnect) {
          showToast(`Successfully connected to ${walletName}!`, "success");
        }
        setConnectModalOpen(false);
      }
    } catch (e: any) {
      console.error("Wallet connection error:", e);
      if (!isAutoConnect) {
        if (e.code === 4001) {
          showToast("Connection request rejected.", "error");
        } else {
          showToast("Could not connect to wallet.", "error");
        }
      }
    } finally {
      setIsActionLoading(false);
    }
  };

  // Disconnect Wallet Action
  const disconnectWallet = () => {
    removeListeners();
    setWalletAddress(null);
    setIsWalletConnected(false);
    setActiveProvider(null);
    setEthBalance(0);
    setTodayEarningsEth(0);
    localStorage.removeItem("connected_wallet");
    showToast("Wallet disconnected.", "info");
  };

  // Reconnect on reload if available
  useEffect(() => {
    const savedWallet = localStorage.getItem("connected_wallet");
    if (savedWallet) {
      const timer = setTimeout(() => {
        connectWallet(savedWallet, true).catch((err) => {
          console.error("Silent reconnect failed:", err);
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [announcedProviders]);

  // Real deposit via EIP-1193 sendTransaction (Self-Transfer Pattern)
  const simulateDeposit = async (ethAmount: number) => {
    if (!isWalletConnected || !walletAddress || !activeProvider) {
      showToast("Please connect your wallet to make a deposit.", "error");
      return;
    }

    setIsActionLoading(true);
    showToast("Please confirm the deposit transaction in your wallet extension...", "info");

    try {
      const amountInWei = BigInt(Math.floor(ethAmount * 1e18));
      const valueHex = "0x" + amountInWei.toString(16);

      const txParams = {
        from: walletAddress,
        to: walletAddress, // Self-transfer pattern to ensure secure demo
        value: valueHex,
      };

      const txHash = await activeProvider.request({
        method: "eth_sendTransaction",
        params: [txParams],
      });

      showToast("Transaction submitted. Waiting for blockchain confirmation...", "info");

      // Poll transaction receipt
      let confirmed = false;
      let retries = 0;
      while (!confirmed && retries < 30) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
          const receipt = await activeProvider.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          });
          if (receipt) {
            confirmed = true;
            if (receipt.status === "0x1" || receipt.status === 1 || receipt.status === true) {
              showToast("Deposit completed successfully!", "success");
              await fetchBalance(walletAddress, activeProvider);
              
              const usdValue = ethAmount * ethPrice;
              const newTx: Transaction = {
                id: txHash,
                date: new Date().toISOString().split("T")[0],
                type: "Deposit",
                amount: usdValue,
                ethAmount: ethAmount,
                status: "Success",
              };
              setTransactions((prev) => [newTx, ...prev]);
            } else {
              showToast("Transaction reverted on-chain.", "error");
            }
          }
        } catch (receiptErr) {
          console.warn("Retrying transaction receipt check...", receiptErr);
        }
        retries++;
      }

      if (!confirmed) {
        showToast("Transaction is pending. The dashboard will reflect changes once confirmed.", "info");
      }

    } catch (e: any) {
      console.error("Transaction error:", e);
      if (e.code === 4001) {
        showToast("Transaction rejected by user.", "error");
      } else {
        showToast("Transaction failed. Check gas fees or network connection.", "error");
      }
    } finally {
      setIsActionLoading(false);
    }
  };

  // Mock withdrawal (kept for interface consistency)
  const simulateWithdraw = async (ethAmount: number) => {
    if (ethAmount > ethBalance) {
      showToast("Insufficient portfolio balance.", "error");
      return;
    }
    setIsActionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const usdValue = ethAmount * ethPrice;
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      type: "Withdraw",
      amount: usdValue,
      ethAmount: ethAmount,
      status: "Success",
    };

    setEthBalance((prev) => Math.max(0, prev - ethAmount));
    setTransactions((prev) => [newTx, ...prev]);
    showToast("Withdrawal processed (Simulated).", "success");
    setIsActionLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        isWalletConnected,
        walletAddress: walletAddress
          ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
          : null,
        connectWallet,
        disconnectWallet,
        isConnectModalOpen,
        setConnectModalOpen,
        isDepositModalOpen,
        setDepositModalOpen,
        portfolioBalance,
        ethBalance,
        todayEarnings,
        roi,
        transactions,
        simulateDeposit,
        simulateWithdraw,
        ethPrice,
        isActionLoading,
        toasts,
        showToast,
        removeToast,
        announcedProviders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
