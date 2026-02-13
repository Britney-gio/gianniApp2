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
    "Questa scelta non rappresenta solo un'innovazione tecnologica, ma anche una scelta ecologica. Usare token ERC-20 significa scegliere un sistema digitale più sostenibile, riducendo l’uso di denaro fisico e i relativi sprechi..";

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
    <main className="mx-auto flex w-full max-w-[680px] flex-col gap-10 px-5 pb-12 pt-8 text-left text-[0.95rem]">
      <TopNav />

      {/* HERO MODERNO */}
      <section className="mt-10 pt-20">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            <div className="relative">
              <img
                src="/img-footer.jpg"
                alt="campo Gianni vista Etna"
                className="h-60 w-full object-cover md:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />

              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                Sicilia • Bio • Km0
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Benvenuto
              </h1>

              <h2 className="mt-2 text-lg font-bold text-slate-800 md:text-xl">
                Il market dalla terra di Sicilia alla blockchain Ethereum
              </h2>

              <p className="mt-4 leading-relaxed text-slate-700">
                Gianni è un agricoltore siciliano che porta prodotti biologici e
                a km zero nel mondo Web3, unendo tradizione e innovazione.
              </p>

              <p className="mt-3 leading-relaxed text-slate-700">
                Qui puoi acquistare tramite token su blockchain Ethereum, usando
                ETH di prova su rete test.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold text-white transition"
                  onClick={() => {
                    const el = document.getElementById("products");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Esplora i prodotti
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="features mt-2" aria-label="Come funziona">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Come funziona ?
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="card-earth p-4 opacity-0 translate-y-2 animate-fadeUp">
            <h3 className="text-base font-bold text-slate-900">
              Scegli il prodotto
            </h3>
            <p className="text-slate-700">
              Seleziona agrumi, frutta secca e specialità locali direttamente
              dalla vetrina.
            </p>
          </article>

          <article className="card-earth p-4 opacity-0 translate-y-2 animate-fadeUp [animation-delay:250ms]">
            <h3 className="text-base font-bold text-slate-900">
              Connetti il wallet
            </h3>
            <p className="text-slate-700">
              Collega MetaMask e verifica il saldo su Sepolia prima
              dell’acquisto.
            </p>
          </article>

          <article className="card-earth p-4 opacity-0 translate-y-2 animate-fadeUp [animation-delay:500ms]">
            <h3 className="text-base font-bold text-slate-900">
              Paga in ETH (test)
            </h3>
            <p className="text-slate-700">
              Confermi la transazione e puoi tracciare tutto su Etherscan in
              trasparenza.
            </p>
          </article>
        </div>
      </section>

      {/* ALERT BUTTON */}
      <button
        className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold text-white transition"
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
            <h3 id="alert-title" className="text-lg font-bold text-slate-900">
              Perchè questa scelta?
            </h3>
            <p className="text-slate-700">{alertMessage}</p>
            <button
              type="button"
              onClick={() => setIsAlertOpen(false)}
              className="btn-primary rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}

      {/* PRODOTTI */}
      <section id="products" className="products">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          I prodotti della nostra terra:
        </h2>

        <p className="text-slate-700">
          Tutti i prodotti provengono dai campi di Gianni, situati in Sicilia,
          coltivati e curati con metodi biologici e sostenibili da lui e dalla
          sua famiglia.
        </p>

        <div className="wide-section mt-4">
          <div className="carousel-wide">
            <div className="carousel-wrapper">
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
                      <h3 className="text-lg font-bold text-slate-900">
                        {product.name}
                      </h3>

                      <p className="text-slate-700">
                        Origine: {product.origin}
                      </p>

                      <p className="text-slate-700">
                        Quantità: {product.quantity}
                      </p>

                      <p className="text-slate-900">
                        <strong>Prezzo al kg:</strong> {product.price}
                      </p>

                      <img src={product.image} alt={product.name} />

                      <button
                        className="btn-primary"
                        type="button"
                        onClick={() =>
                          navigate("/checkout", {
                            state: { productItem: product },
                          })
                        }
                      >
                        Procedi all&apos; acquisto
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
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-6 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-slate-700">
          Grazie per aver scelto un'agricoltura sostenibile e trasparente.
        </p>
        <p className="text-slate-700">
          Lo staff dell'azienda agricola di Gianni
        </p>

        <img
          src="/img-footer.jpg"
          alt="campo Gianni vista Etna"
          className="mt-3 h-40 w-full rounded-xl object-cover"
        />
      </footer>
    </main>
  );
}
