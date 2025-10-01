import { useState, useCallback, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

interface AptosState {
  aptos: Aptos | null;
  loading: boolean;
  error: string | null;
}

export const useAptos = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [state, setState] = useState<AptosState>({
    aptos: null,
    loading: false,
    error: null,
  });

  const initializeAptos = useCallback(() => {
    try {
      const network = (import.meta.env.VITE_APTOS_NETWORK as Network) || Network.DEVNET;
      const config = new AptosConfig({ network });
      const aptosClient = new Aptos(config);
      setState((prev) => ({ ...prev, aptos: aptosClient, error: null }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message }));
    }
  }, []);

  const submitTransaction = useCallback(
    async (payload: any) => {
      if (!account || !signAndSubmitTransaction) {
        throw new Error("Wallet not connected");
      }

      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const response = await signAndSubmitTransaction(payload);
        if (state.aptos) {
          await state.aptos.transaction.waitForTransaction({ transactionHash: response.hash });
        }
        return response;
      } catch (error: any) {
        setState((prev) => ({ ...prev, error: error.message }));
        throw error;
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [account, signAndSubmitTransaction, state.aptos]
  );

  // Add additional functions to interact with the smart contract here,
  // like initializeIssuer, initializeStudent, getIssuerInfo, issueCertification, etc.

  useEffect(() => {
    initializeAptos();
  }, [initializeAptos]);

  return {
    aptos: state.aptos,
    loading: state.loading,
    error: state.error,
    initializeAptos,
    submitTransaction,
  };
};
