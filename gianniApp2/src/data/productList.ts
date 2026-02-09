import type { Product } from "../types/product";

// Lista dei prodotti disponibili nell'e-commerce

export const productList: Product[] = [
  {
    id: "1",
    name: "Limoni di Siracusa",
    description:
      "Limoni profumati e ricchi di succo, coltivati sotto il sole caldo della costa siracusana. Raccolti a mano e non trattati, ideali per cucina, dolci e bevande naturali.",
    origin: "Siracusa (SR)",
    quantity: "1 kg",
    price: "0.001 ETH",
    image: "/limone-sr.jpg",
  },
  {
    id: "2",
    name: "Arance Tarocco di Catania",
    description:
      "Arance Tarocco a polpa rossa, dolci e succose, coltivate nella Piana di Catania. Un agrume tipico siciliano, apprezzato per il suo equilibrio tra dolcezza e acidità.",
    origin: "Catania (CT)",
    quantity: "1 kg",
    price: "0.001 ETH",
    image: "/arance-ct.jpeg",
  },
  {
    id: "3",
    name: "Fichi D'india dei Paesi Etnei",
    description:
      "Fichi d'India colorati maturati al sole sul particolare terreno del vulcano Etna, dal sapore intenso e naturale. Frutti simbolo della Sicilia, coltivati senza trattamenti chimici.",
    origin: "Etna (CT)",
    quantity: "1 kg",
    price: "0.001 ETH",
    image: "/fichi-ct.jpg",
  },
  {
    id: "4",
    name: "Mandorle di Avola",
    description:
      "Pregiate mandorle di Avola, famose nel mondo per il loro aroma delicato e la consistenza croccante. Ideali per dolci tradizionali siciliani e consumo naturale.",
    origin: "Avola (SR)",
    quantity: "1 kg",
    price: "0.001 ETH",
    image: "/mandorle-avola.jpg",
  },
];
