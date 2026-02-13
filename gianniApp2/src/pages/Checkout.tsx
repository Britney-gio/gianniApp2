import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Product } from "../types/product";
import TopNav from "../components/TopNav";
import "../styles/checkout.scss";

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

  const [selectedConnectorUid, setSelectedConnectorUid] = useState<
    string | null
  >(null);

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
    data: txDataHash,
    isPending: isTxPending,
    isSuccess: isTxSuccess,
    error: txError,
  } = useSendTransaction();

  const etherscanUrl = txDataHash
    ? `https://sepolia.etherscan.io/tx/${txDataHash}`
    : null;

  const handleConfirmPurchase = () => {
    if (!address) return;
    if (isTxPending || isTxSuccess) return;

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
      <TopNav
        rightSlot={
          <button
            type="button"
            className="top-nav__btn btn-primary"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        }
      />

      <header className="hero mt-20">
        <h1>Checkout</h1>
        <p>Rivedi i dettagli e conferma il tuo ordine.</p>
      </header>

      <div className="checkout-wrapper">
        <section className="checkout-layout ">
          <div className="checkout-left p-8">
            {!isConnected && (
              <div className="wallet-box">
                <p>Collega il wallet per procedere all’acquisto</p>

                <div className="wallet-buttons">
                  {connectors.map((connector) => (
                    <button
                      className="btn-primary"
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

            <div className="checkout-product">
              <div className="checkout-product__media">
                <img src={productItem.image} alt={productItem.name} />
              </div>

              <div className="checkout-product__content">
                <h2 className="checkout-product__title">{productItem.name}</h2>

                <p className="checkout-product__desc">
                  {productItem.description}
                </p>

                <div className="checkout-product__rows">
                  <p>
                    <strong>Origine:</strong> {productItem.origin}
                  </p>
                  <p>
                    <strong>Quantità:</strong> {productItem.quantity}
                  </p>
                  <p>
                    <strong>Prezzo:</strong> {PRICE_ETH} ETH
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isConnected && (
            <aside className="checkout-right wallet-info p-8 mb-8">
              <h3>Wallet connesso</h3>

              <p className="address p-2">{address}</p>

              <p>
                <strong cl>Saldo:</strong>{" "}
                {isBalanceLoading && "Caricamento..."}
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
                <button
                  className="btn-primary mb-3 mt-3 mr-3 "
                  onClick={() => disconnect()}
                >
                  Disconnetti
                </button>

                {!isTxSuccess ? (
                  <button
                    className="btn-primary confirm-button"
                    onClick={handleConfirmPurchase}
                    disabled={isTxPending || !hasEnoughBalance}
                  >
                    {isTxPending
                      ? "Transazione in corso..."
                      : "Conferma acquisto"}
                  </button>
                ) : (
                  <button
                    className="btn-primary confirm-button"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Torna ai prodotti
                  </button>
                )}
              </div>

              {isTxSuccess && txDataHash && (
                <div className="tx-info">
                  <p className="success">Acquisto completato</p>

                  <p className="tx-hash">
                    <strong>Tx hash:</strong>{" "}
                    <span className="mono">{txDataHash}</span>
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

      <footer className="footer mt-20">
        <p>Grazie per aver scelto un'agricoltura sostenibile e trasparente.</p>
        <p>Lo staff dell'azienda agricola di Gianni</p>
      </footer>
    </main>
  );
}
