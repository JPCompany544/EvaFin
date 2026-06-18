import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppContext";
import { ConnectModal } from "@/components/ConnectModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eva.invest — The Easiest Way to Invest in DeFi",
  description:
    "Deposit ETH once. Our automated yield strategies work in the background while you monitor everything from a beautiful dashboard. Institutional DeFi, simplified.",
  keywords: ["DeFi", "yield", "ETH", "invest", "crypto", "automated", "non-custodial"],
  openGraph: {
    title: "Eva.invest — The Easiest Way to Invest in DeFi",
    description: "Deposit ETH once. Automated yield. Beautiful dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[#0B0F14] text-white antialiased font-sans">
        <AppProvider>
          {children}
          <ConnectModal />
        </AppProvider>
      </body>
    </html>
  );
}

