import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Product } from "../types/product";
import "../styles/home.scss";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useSendTransaction,
} from "wagmi";

import { formatUnits, parseEther } from "viem";

const RECIPIENT_ADDRESS = "0x359CDd44E2a0dC045A8b0E62d2B0d685429EF894"; // GIANNI WALLET
const PRICE_ETH = "0.001"; // prezzo in ETH (Sepolia)

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // Per mostrare "in corso" solo sul bottone cliccato
  const [selectedConnectorUid, setSelectedConnectorUid] = useState<string | null>(
    null
  );

  // PRODOTTO SCELTO
  const productItem = location.state?.productItem as Product | undefined;

  // BALANCE WALLET CONNESSO
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
    query: { enabled: Boolean(isConnected && address) },
  });

  const formattedBalance = balanceData
    ? formatUnits(balanceData.value, balanceData.decimals)
    : null;

  const hasEnoughBalance =
    formattedBalance && Number(formattedBalance) >= Number(PRICE_ETH);

  // TRANSAZIONE
  const {
    sendTransaction,
    data: txHash,
    isPending: isTxPending,
    isSuccess: isTxSuccess,
    error: txError,
  } = useSendTransaction();

  const etherscanUrl = txHash
    ? `https://sepolia.etherscan.io/tx/${txHash}`
    : null;

  const handleConfirmPurchase = () => {
    if (!address) return;

    sendTransaction({
      to: RECIPIENT_ADDRESS,
      value: parseEther(PRICE_ETH),
    });
  };

  if (!productItem) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="page">
      <header className="hero">
        <h1>Checkout</h1>
        <p>Rivedi i dettagli e conferma il tuo ordine.</p>
      </header>

      <button
        className="alert-button"
        type="button"
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className="checkout-wrapper">
        <section className="checkout-layout">
          {/* COLONNA SINISTRA — PRODOTTO */}
          <div className="checkout-left product-card">
            {!isConnected && (
              <div className="wallet-box">
                <p>Collega il wallet per procedere all’acquisto</p>

                <div className="wallet-buttons">
                  {connectors.map((connector) => (
                    <button
                      key={connector.uid}
                      onClick={() => {
                        setSelectedConnectorUid(connector.uid);
                        connect({ connector });
                      }}
                      disabled={isPending}
                    >
                      Connetti {connector.name}
                      {isPending &&
                        selectedConnectorUid === connector.uid &&
                        " (in corso...)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <img src={productItem.image} alt={productItem.name} />
            <h2>{productItem.name}</h2>
            <p>{productItem.description}</p>
            <p>Origine: {productItem.origin}</p>
            <p>Quantità: {productItem.quantity}</p>
            <p>
              <strong>Prezzo al kg:</strong> {PRICE_ETH} ETH
            </p>
          </div>

          {/* COLONNA DESTRA — WALLET */}
          {isConnected && (
            <aside className="checkout-right wallet-info">
              <h3>Wallet connesso</h3>

              <p className="address">{address}</p>

              <p>
                <strong>Saldo:</strong> {isBalanceLoading && "Caricamento..."}
                {!isBalanceLoading && formattedBalance && (
                  <>
                    {formattedBalance} {balanceData?.symbol}
                  </>
                )}
                {!isBalanceLoading &&
                  !formattedBalance &&
                  "Saldo non disponibile"}
              </p>

              {!hasEnoughBalance && (
                <p className="error">Saldo insufficiente</p>
              )}

              <div className="wallet-actions">
                <button onClick={() => disconnect()}>Disconnetti</button>

                <button
                  className="confirm-button"
                  onClick={handleConfirmPurchase}
                  disabled={isTxPending || !hasEnoughBalance || isTxSuccess}
                >
                  {isTxPending ? "Transazione in corso..." : "Conferma acquisto"}
                </button>
              </div>

              {isTxSuccess && txHash && (
                <div className="tx-info">
                  <p className="success">Acquisto completato</p>

                  <p className="tx-hash">
                    <strong>Tx hash:</strong>{" "}
                    <span className="mono">{txHash}</span>
                  </p>

                  <a
                    href={etherscanUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="etherscan-link"
                  >
                    Vedi su Etherscan
                  </a>
                </div>
              )}

              {txError && <p className="error">Errore: {txError.message}</p>}
            </aside>
          )}
        </section>
      </div>

      <footer className="footer">
        <p>Grazie per aver scelto un'agricoltura sostenibile e trasparente.</p>
        <p>Lo staff dell'azienda agricola di Gianni</p>
      </footer>
    </main>
  );
}
