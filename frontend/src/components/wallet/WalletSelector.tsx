import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import toast from "react-hot-toast";
import { WalletIcon } from "@heroicons/react/24/outline";

const WalletSelector: React.FC = () => {
  const { connect, disconnect, connected, connecting, wallets } = useWallet();

  const handleConnect = async (walletName: string) => {
    try {
      await connect(walletName);
      toast.success("Wallet connected successfully!");
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      toast.error(error?.message || "Failed to connect wallet");
    }
  };

  if (connected) {
    return null; // Header manages connected state display
  }

  if (connecting) {
    return (
      <button className="btn-primary btn" disabled>
        <div className="spinner mr-2" />
        Connecting...
      </button>
    );
  }

  // If only one wallet, show button
  if (wallets.length === 1) {
    return (
      <button
        onClick={() => handleConnect(wallets[0].name)}
        className="btn-primary btn flex items-center space-x-2"
      >
        <WalletIcon className="w-5 h-5" />
        <span>Connect Wallet</span>
      </button>
    );
  }

  // For multiple wallets, attempt to connect first found Petra or default to first wallet
  const primaryWallet = wallets.find((w) => w.name.toLowerCase().includes("petra")) || wallets[0];

  return (
    <button
      onClick={() => primaryWallet && handleConnect(primaryWallet.name)}
      className="btn-primary btn flex items-center space-x-2"
      disabled={!primaryWallet}
    >
      <WalletIcon className="w-5 h-5" />
      <span>Connect Wallet</span>
    </button>
  );
};

export default WalletSelector;
