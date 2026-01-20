# Progetto start2impact : E‑commerce Web3 di Gianni

Questo progetto è un semplice e‑commerce ambientato in Sicilia, dove i prodotti agricoli vengono acquistati tramite token sulla blockchain Ethereum (rete di test Sepolia). L’obiettivo è mostrare un flusso completo ma essenziale: scelta del prodotto, collegamento del wallet e simulazione pagamento.

## Scelte tecniche principali

- **React + Vite**: struttura leggera e pronta, questo mi ha permesso di concentrarmi sulle funzionalità della dApp senza configurazioni complesse.

- **React Router**: suddivisione chiara delle pagine (Home, Checkout, NotFound) per rendere il flusso di navigazione semplice e ordinato.

- **Wagmi + viem**: usati per collegare il wallet e inviare una transazione di prova.

- **React Query**: gestione della richiesta del saldo e dello stato della connessione in modo pulito e automatico, evitando logiche manuali di caricamento.

- **Dati statici in `listaProdotti`**: i prodotti sono definiti in un file separato per mantenere il codice ordinato e facilmente modificabile.

- **SCSS + CSS**: organizzazione degli stili in file dedicati per migliorare la leggibilità e separare la logica dalla presentazione.

## Struttura essenziale

- `src/pages/Home.tsx`: presentazione del progetto, carosello prodotti e scelta dell’articolo.

- `src/pages/Checkout.tsx`: collegamento wallet, saldo e conferma acquisto.

- `src/data/listaProdotti.ts`: elenco prodotti.

## Autore

<p align="left">
  <img src="./src/img/gn2.jpg" alt="Logo Giorgia Nieli" width="100" />
</p>

Sviluppato da **Giorgia Nieli**  

- Email: [giorgianieli@gmail.com](mailto:giorgianieli@gmail.com)
