import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productList } from "../data/productList";
import "../styles/home.scss";

export default function Home() {
  const navigate = useNavigate();

  const VISIBLE_ITEMS = 3; // CARD VISIBILI NEL CAROUSEL
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = productList.length;
  const canNavigate = totalItems > 1;

  const handlePrev = () => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev + 1 >= totalItems ? 0 : prev + 1));
  };

  const visibleProducts = useMemo(() => {
    if (totalItems === 0) return [];
    const items = [];
    const count = Math.min(VISIBLE_ITEMS, totalItems);

    for (let i = 0; i < count; i++) {
      items.push(productList[(currentIndex + i) % totalItems]);
    }
    return items;
  }, [currentIndex, totalItems, VISIBLE_ITEMS]);

  return (
    <main className="page">
      <header className="hero">
        <h1>GianniApp</h1>
        <p>Prodotti biologici siciliani a km zero.</p>
      </header>

      <section className="products">
        <div className="carousel">
          <button
            type="button"
            className="carousel-arrow left"
            onClick={handlePrev}
            aria-label="Prodotti precedenti"
            disabled={!canNavigate}
          >
            ←
          </button>

          <div className="carousel-viewport">
            <ul className="product-list">
              {visibleProducts.map((product) => (
                <li key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/checkout", {
                        state: { productItem: product },
                      })
                    }
                  >
                    Procedi all'acquisto
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="carousel-arrow right"
            onClick={handleNext}
            aria-label="Prodotti successivi"
            disabled={!canNavigate}
          >
            →
          </button>
        </div>
      </section>

      <footer className="footer">
        <p>Valorizziamo il territorio e i suoi prodotti.</p>
      </footer>
    </main>
  );
}
