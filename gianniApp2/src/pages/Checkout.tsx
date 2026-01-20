import { useLocation, Navigate, useNavigate } from "react-router-dom";
import type { Prodotti } from "../types/prodotti";
import "../styles/home.scss";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useSendTransaction,
} from "wagmi";

import { formatUnits, parseEther } from "viem";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // 👉 PRODOTTO
  const prodotto = location.state?.prodotto as Prodotti | undefined;

  // 👉 BALANCE
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
    query: { enabled: Boolean(isConnected && address) },
  });

  const formattedBalance = balanceData
    ? formatUnits(balanceData.value, balanceData.decimals)
    : null;

  // 👉 TRANSAZIONE
  const DESTINATARIO = "0x359CDd44E2a0dC045A8b0E62d2B0d685429EF894"; // ricevente
  const PREZZO_ETH = "0.001"; // prezzo in ETH (Sepolia)

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
      to: DESTINATARIO,
      value: parseEther(PREZZO_ETH),
    });
  };

  const saldoSufficiente =
    formattedBalance && Number(formattedBalance) >= Number(PREZZO_ETH);

  if (!prodotto) {
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
          {/* SINISTRA — PRODOTTO */}
          <div className="checkout-left prodotto-card">
            {!isConnected && (
              <div className="wallet-box">
                <p>Collega il wallet per procedere all’acquisto</p>

                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    disabled={isPending}
                  >
                    Connetti {connector.name}
                    {isPending && " (in corso...)"}
                  </button>
                ))}
              </div>
            )}

            <img src={prodotto.immagine} alt={prodotto.nome} />
            <h2>{prodotto.nome}</h2>
            <p>{prodotto.descrizione}</p>
            <p>Origine: {prodotto.origine}</p>
            <p>
              <strong>Prezzo:</strong> {PREZZO_ETH} ETH
            </p>
          </div>

          {/* DESTRA — WALLET */}
          {isConnected && (
            <aside className="checkout-right wallet-info">
              <h3>Wallet connesso</h3>

              <p className="address">
                {address?.slice(0, 6)}…{address?.slice(-4)}
              </p>

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

              {!saldoSufficiente && (
                <p className="error">Saldo insufficiente</p>
              )}

              <button onClick={() => disconnect()}>Disconnetti</button>

              <button
                className="confirm-button"
                onClick={handleConfirmPurchase}
                disabled={isTxPending || !saldoSufficiente}
              >
                {isTxPending ? "Transazione in corso..." : "Conferma acquisto"}
              </button>

              {isTxSuccess && txHash && (
                <div className="tx-info">
                  <p className="success">Acquisto completato</p>

                  <p className="tx-hash">
                    <strong>Tx hash:</strong>{" "}
                    <span className="mono">
                      {txHash.slice(0, 10)}…{txHash.slice(-8)}
                    </span>
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
