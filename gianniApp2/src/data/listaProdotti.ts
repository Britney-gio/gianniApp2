import type { Prodotti } from "../types/prodotti";

// Lista dei prodotti disponibili nell'e-commerce

export const listaProdotti: Prodotti[] = [
  {
    id: "1",
    nome: "Limoni di Siracusa",
    descrizione:
      "Limoni profumati e ricchi di succo, coltivati sotto il sole caldo della costa siracusana. Raccolti a mano e non trattati, ideali per cucina, dolci e bevande naturali.",
    origine: "Siracusa (SR)",
    quantità: "1 kg",
    prezzo: "0.001 ETH",
    immagine: "/limone-sr.jpg",
  },
  {
    id: "2",
    nome: "Arance Tarocco di Catania",
    descrizione:
      "Arance Tarocco a polpa rossa, dolci e succose, coltivate nella Piana di Catania. Un agrume tipico siciliano, apprezzato per il suo equilibrio tra dolcezza e acidità.",
    origine: "Catania (CT)",
    quantità: "1 kg",
    prezzo: "0.001 ETH",
    immagine: "/arance-ct.jpeg",
  },
  {
    id: "3",
    nome: "Fichi D'india dei Paesi Etnei",
    descrizione:
      "Fichi d'India colorati maturati al sole sul particolare terreno del vulcano Etna, dal sapore intenso e naturale. Frutti simbolo della Sicilia, coltivati senza trattamenti chimici.",
    origine: "Etna (CT)",
    quantità: "1 kg",
    prezzo: "0.001 ETH",
    immagine: "/fichi-ct.jpg",
  },
  {
    id: "4",
    nome: "Mandorle di Avola",
    descrizione:
      "Pregiate mandorle di Avola, famose nel mondo per il loro aroma delicato e la consistenza croccante. Ideali per dolci tradizionali siciliani e consumo naturale.",
    origine: "Avola (SR)",
    quantità: "1 kg",
    prezzo: "0.001 ETH",
    immagine: "/mandorle-avola.jpg",
  },
];
