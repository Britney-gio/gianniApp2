import { useLocation, Navigate, useNavigate } from "react-router-dom";
import type { Prodotti } from "../types/prodotti";
import "../styles/home.scss";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const prodotto = location.state?.prodotto as Prodotti | undefined;

  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
    query: {
      enabled: isConnected,
    },
  });

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

      {/* wrapper full-width */}
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
              <strong>Prezzo:</strong> {prodotto.prezzo}
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
                <strong>Saldo:</strong>{" "}
                {isBalanceLoading
                  ? "Caricamento..."
                  : `${balanceData?.formatted} ${balanceData?.symbol}`}
              </p>

              <button onClick={() => disconnect()}>Disconnetti</button>

              <button className="confirm-button">Conferma acquisto</button>
            </aside>
          )}
        </section>
      </div>

      <footer className="footer">
        <p>Grazie per aver scelto un'agricoltura sostenibile e trasparente.</p>
        <p>Lo staff dell'azienda agricola di Gianni</p>
        <img src="../src/img/img-footer.jpg" alt="campo Gianni vista Etna" />
      </footer>
    </main>
  );
}
