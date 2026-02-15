# Progetto Start2Impact: E-commerce Web3 di Gianni

🔗 https://gianni-appv2.vercel.app/

Questo progetto è un semplice e-commerce ambientato in Sicilia, dove i prodotti agricoli vengono acquistati tramite token sulla blockchain Ethereum (rete di test Sepolia).

L’obiettivo è mostrare un flusso completo ma essenziale: scelta del prodotto, collegamento del wallet e simulazione del pagamento.

---

## Scelte tecniche principali

- **Funzionalità principali**:
  - Carosello prodotti responsive (1 / 2 / 3 card in base al dispositivo)
  - Navigazione fluida Home → Checkout tramite React Router
  - Connessione wallet tramite Wagmi
  - Lettura saldo ETH del wallet connesso
  - Invio transazione ETH su rete test Sepolia
  - Gestione degli stati di caricamento e conferma transazione
  - Visualizzazione hash transazione con link diretto a Etherscan
  - UI moderna e responsive (mobile-first)

- **React + Vite**: struttura leggera e veloce che mi ha permesso di concentrarmi sulle funzionalità della dApp senza configurazioni complesse.

- **React Router**: suddivisione chiara delle pagine (Home, Checkout, NotFound) per rendere il flusso di navigazione semplice e ordinato.

- **Wagmi + viem**: utilizzati per collegare il wallet e inviare una transazione di prova sulla rete Sepolia.

- **React Query**: gestione del saldo e dello stato della connessione in modo automatico, evitando logiche manuali di caricamento.

- **Dati statici in `listaProdotti`**: i prodotti sono definiti in un file separato per mantenere il codice ordinato e facilmente modificabile.

- **Tailwind CSS + SCSS**: utilizzati insieme per organizzare stili, gestire rapidamente layout e aggiungere animazioni.

- **Vercel**: deploy semplice e automatico.

---

## Struttura essenziale

- `src/components/ScrollToTop.tsx`: componente per forzare lo scroll in alto ad ogni cambio pagina (funzionalità non gestita automaticamente da React Router).
- `src/components/TopNav.tsx`: componente Navbar riutilizzabile con slot dinamico.
- `src/data/listaProdotti.ts`: lista statica dei prodotti.
- `src/pages/Home.tsx`: hero section, sezione informativa e carosello prodotti responsive.
- `src/pages/Checkout.tsx`: connessione wallet, saldo ETH, invio transazione e riepilogo finale.
- `src/pages/NotFound.tsx`: pagina di errore in caso di percorso inesistente.
- `src/styles/`: stili delle pagine e media query del progetto.

---

## Autore

<p align="left">
<img src="./public/gn-logo.jpg" alt="Logo Giorgia Nieli" width="100" />
</p>

Sviluppato da **Giorgia Nieli**

- Email: [giorgianieli@gmail.com](mailto:giorgianieli@gmail.com)
