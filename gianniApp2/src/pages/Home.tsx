import { useEffect, useMemo, useState } from "react";
import { productList } from "../data/productList";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import "../styles/home.scss";

function getVisibleItems() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function Home() {
  const navigate = useNavigate();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const alertMessage: string =
    "Questa scelta non rappresenta solo un'innovazione tecnologica, ma anche una scelta ecologica. I token ERC-20 costituiscono un metodo digamento a basso impatto ambientale, poiché non richiedono la stampa di denaro fisico e riducono le emissioni legate alla sua produzione e gestione.";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  const totalItems = productList.length;
  const lastStartIndex = Math.max(0, totalItems - visibleItems);

  useEffect(() => {
    const onResize = () => setVisibleItems(getVisibleItems());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (totalItems === 0) return;
    setCurrentIndex((prev) => Math.min(prev, lastStartIndex));
  }, [totalItems, lastStartIndex]);

  const handlePrev = () => {
    if (totalItems === 0) return;

    setCurrentIndex((prev) => {
      const next = prev - visibleItems;
      return next < 0 ? lastStartIndex : next;
    });
  };

  const handleNext = () => {
    if (totalItems === 0) return;

    setCurrentIndex((prev) => {
      const next = prev + visibleItems;
      return next >= totalItems ? 0 : next;
    });
  };

  const visibleProducts = useMemo(() => {
    if (totalItems === 0) return [];
    const count = Math.min(visibleItems, totalItems);

    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(productList[(currentIndex + i) % totalItems]);
    }
    return items;
  }, [currentIndex, totalItems, visibleItems]);

  return (
    <main className="page">
      <TopNav />

      <header
        className="hero hero--img"
        style={{ backgroundImage: "url(/img-footer.jpg)" }}
      >
        <div className="hero__overlay" />

        <div className="hero__content">
          <h1>Benvenuto nell'e-commerce innovativo di Gianni</h1>
          <h2>Dalla terra di Sicilia alla blockchain Ethereum</h2>

          <p>
            Gianni è un agricoltore siciliano che insieme alla sua famiglia da
            generazioni coltiva la propria terra con passione e rispetto per la
            natura. Oggi porta i suoi prodotti biologici e a km zero nel mondo
            Web3, unendo tradizione e innovazione.
          </p>

          <p>
            In questa piattaforma è possibile acquistare esclusivamente tramite
            token su blockchain Ethereum, utilizzando ETH di prova su rete test.
          </p>
        </div>
      </header>

      <section className="features" aria-label="Come funziona">
        <h2>Come funziona</h2>

        <div className="features__grid">
          <article className="feature-card">
            <h3>1) Scegli il prodotto</h3>
            <p>
              Seleziona agrumi, frutta secca e specialità locali direttamente
              dalla vetrina.
            </p>
          </article>

          <article className="feature-card">
            <h3>2) Connetti il wallet</h3>
            <p>
              Collega MetaMask e verifica il saldo su Sepolia prima
              dell’acquisto.
            </p>
          </article>

          <article className="feature-card">
            <h3>3) Paga in ETH (test)</h3>
            <p>
              Confermi la transazione e puoi tracciare tutto su Etherscan in
              trasparenza.
            </p>
          </article>
        </div>
      </section>

      <section className="whyweb3" aria-label="Perché Web3">
        <div className="whyweb3__content">
          <h2>Perché Web3?</h2>
          <p>
            Questo progetto è una demo didattica: un checkout che simula un
            acquisto “trasparente” grazie alla blockchain.
          </p>
          <ul>
            <li>Tracciabilità pubblica della transazione</li>
            <li>Wallet come identità dell’utente</li>
            <li>Base solida per evoluzioni (token, loyalty, supply chain)</li>
          </ul>

          <div className="whyweb3__cta">
            <button
              type="button"
              className="primary"
              onClick={() => navigate("/")}
            >
              Esplora i prodotti
            </button>
            <a className="secondary" href="#products">
              Vai alla gallery
            </a>
          </div>
        </div>
      </section>

      <button
        className="alert-button"
        type="button"
        onClick={() => setIsAlertOpen(true)}
      >
        Perchè questa scelta?
      </button>

      {isAlertOpen && (
        <div
          className="alert-overlay"
          role="presentation"
          onClick={() => setIsAlertOpen(false)}
        >
          <div
            className="alert-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="alert-title">Perchè questa scelta?</h3>
            <p>{alertMessage}</p>
            <button type="button" onClick={() => setIsAlertOpen(false)}>
              Chiudi
            </button>
          </div>
        </div>
      )}

      <section className="products">
        <h2>I prodotti della nostra terra:</h2>
        <p>
          Tutti i prodotti provengono dai campi di Gianni, situati in Sicilia,
          coltivati e curati con metodi biologici e sostenibili da lui e dalla
          sua famiglia.
        </p>

        <div className="carousel">
          <button
            className="arrow sx"
            onClick={handlePrev}
            type="button"
            aria-label="Prodotti precedenti"
            disabled={totalItems <= visibleItems}
          >
            ←
          </button>

          <div className="carousel-viewport">
            <ul className="product-list">
              {visibleProducts.map((product) => (
                <li key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Origine: {product.origin}</p>
                  <p>Quantità: {product.quantity}</p>
                  <p>
                    <strong>Prezzo al kg:</strong> {product.price}
                  </p>
                  <img src={product.image} alt={product.name} />
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/checkout", { state: { productItem: product } })
                    }
                  >
                    Procedi all' acquisto
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="arrow dx"
            onClick={handleNext}
            type="button"
            aria-label="Prodotti successivi"
            disabled={totalItems <= visibleItems}
          >
            →
          </button>
        </div>
      </section>

      <footer className="footer footer-img">
        <p>Grazie per aver scelto un'agricoltura sostenibile e trasparente.</p>
        <p>Lo staff dell'azienda agricola di Gianni</p>
        <img src="/img-footer.jpg" alt="campo Gianni vista Etna" />
      </footer>
    </main>
  );
}
