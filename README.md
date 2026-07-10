# Ruota della Fortuna - Frontend Client

Applicazione web client-side ispirata al celebre gioco televisivo "La Ruota della Fortuna", sviluppata come progetto speciale/personalizzato. L'applicazione include un tabellone interattivo per la rivelazione delle frasi e integra uno stream webcam live per simulare una regia televisiva.

## Installazione e Avvio Locale

1. Clona il repository e installa le dipendenze:
   ```bash
   npm install 
   ```
2. Avvia il server di sviluppo locale:
   ```bash
   npm run dev
   ```
3. Apri nel browser l'indirizzo mostrato nel terminale (solitamente `http://localhost:5173`).

## Struttura Dati & Configurazione
- I quiz (indovinelli e frasi associate) sono memorizzati in formato statico all'interno di `src/data/quizzes.js`.
- I file audio per gli effetti sonori sono posizionati nella cartella pubblica `public/sounds/` (`RIGHT.mp3` e `WRONG.mp3`).

## Note
- L'esperienza di gioco è consigliata da PC per poter apprezzare appieno il layout a due colonne (webcam affiancata al tabellone principale).
