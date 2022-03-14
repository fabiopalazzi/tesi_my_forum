# Brute Force Attack

Un’altra vulnerabilità individuata è relativa agli attacchi brute force.

Gli attacchi brute force consistono nell’individuare una password, provando tutte le possibili combinazioni di lettere, caratteri speciali e numeri. Si tratta dell’ultima spiaggia perché può richiedere un elevato numero di tentativi e un lungo tempo d’esecuzione.

In particolare, un utente malevolo, potrebbe chiamare una molteplicità di volte una chiamata API messa a disposizione dal nostro sistema per trovare la password di un utente. Facendo così, andrebbe quindi a provare tutte le password possibili per trovarne una corretta.

Ad un attacco del genere sono sottoposti principalmente gli utenti con password corte e costituite solamente da lettere e senza caratteri speciali.

Per prevenir questi attacchi, ho incluse il package express-rare-limit: è un middleware integrabile con express il quale permette di configurare due principali parametri:

<aside>
💡 windowMs: la durata della finestra. Durante questo periodo vengono quindi conteggiate tutte le richieste fatte al server

</aside>

<aside>
🗣 max: il numero massimo di richieste attuabili nella windowMs

</aside>

Nel mio caso ho settato una finestra di 15 minuti con un numero massimo di richieste uguale a 100.

Nel back-end vulnerabile, nella sotto cartella test ho creato un attacco brute force che cerca di provare tutte le password contenute in un file txt (di circa 8.6MB), per rubare la password della vittima scelta. Utilizzando il middleware citato, ho notato che non si limita solo a bloccare le richieste nella durata di finestra: se le richieste arrivano troppo velocemente, intuisce che è un bot a inviarle, e quindi già a partire dalla quarta richiesta il codice ritornato è 429 ovvero too many request.