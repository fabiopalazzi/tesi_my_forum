# Security

La sicurezza è l’aspetto chiave dell’applicazione e del progetto di tesi. L’applicazione deve essere sicura per vari motivi:

- Per evitare un furto di dati salvati all'interno del nostro database
- Per evitare di manipolare dati dannosi inviati da utenti fittizi (hacker) che potrebbero sia colpire la nostra base dati, sia altri utenti a cui vengono inviati

L’aspetto della sicurezza verrà nella stragrande maggioranza dei casi analizzata dal back-end. È stata fatta questa scelta in quanto il front-end è un’applicativo che viene utilizzato dallo user e in quanto a contatto con esso, il funzionamento può esserne alterato. Basti pensare alla console integrata all’interno di google chrome nella quale possiamo eseguire script. O basti anche pensare a modificare un file javascript inviato. Un semplice controllo svolto con un if potrebbe ad esempio essere rimosso dall’utente andando a compromettere il tutto.

È quindi intuibile che l’aspetto della sicurezza è gestito dal back-end in particolare dall’applicativo node js. Esso infatti, è eseguito su un server esterno cui si può unicamente interagire attraverso chiamate http/REST ai vari URL gestiti. Nelle richieste inviate al server, si inviano anche parametri che possono essere contenuti nella header o nella body.

Ad esempio per aggiungere un post invocheremo una chiamata POST al back-end all’url api/post. La richiesta conterrà nella header un token Bearer la cui validità verrà verificata dal server e che certifica l’autenticazione dell’utente. Conterrà inoltre nel body vari campi quali il titolo, la descrizione, l’argomento... del post da salvare.

Dopo questo piccolo focus del funzionamento del backend possiamo intuire che è molto importante gestire accuratamente le richieste inviate per evitare problemi di sicurezza.

- XSS: è un attacco di code injection alle applicazioni web. Gli aggressori utilizzano siti Web vulnerabili per iniettare codice dannoso o script. L'XSS consente all'attaccante di iniettare il codice dannoso utilizzando linguaggi di script come JavaScript. Il codice dannoso viene eseguito sul browser dell'utente. L'autore dell'attacco può quindi accedere a cookie, password e altre informazioni riservate salvate dal browser. Un'applicazione Web è vulnerabile a XSS se l'input dell'utente non è codificato in modo appropriato. Quando l'input dell'utente è codificato in modo errato, lo script dannoso viene inviato agli utenti ed eseguito. La convalida dell'input e la sanificazione impropria dei dati forniti dall'utente dell'applicazione Web sono le principali cause degli attacchi XSS. Quando viene eseguito lo script dannoso, l'attaccante può interagire con l'applicazione.
Per prevenire XSS, ho utilizzato la libreria “express-validator” la quale, attraverso il metodo “escape()” converte caratteri pericolosi (ad esempio ‘ < > “ e altri) in caratteri html (come &quot) e li invia al server secondo questa codifica. Il server invierà anch'esso al database i caratteri “pericolosi” codificati. Quando un utente farà una richiesta la cui risposta contiene questi caratteri, il backend restituirà al front-end i caratteri codificati in html. Sarà poi il front-end che tramite la direttiva v-html (in vue js) mostrerà il codice html come testo normale. Il front-end ricevendo questi caratteri codificati in html, non li può interpretare come pezzi di codice javascript, e quindi qualsiasi codice inserito non verrà eseguito ma solamente mostrato. Sono in particolare le richieste POST che soffrono di XSS.
- SQL Injection:  è una tecnica di code injection, usata per attaccare applicazioni che gestiscono dati attraverso database relazionali sfruttando il linguaggio SQL. Il mancato controllo dell'input dell'utente permette di inserire artificiosamente delle stringhe di codice SQL che saranno eseguite dal db: grazie a questo meccanismo è possibile far eseguire comandi SQL anche molto complessi, dall'alterazione dei dati (es. creazione di nuovi utenti) al download completo dei contenuti nel database. Per prevenire la sql injection, ho utilizzato il metodo escape() della classe MySql.Connection a cui va passato la stringa da analizzare. Questo metodo si occuperà quindi di andare a ricercare la presenza nella stringa di sequenze di caratteri sospette e in tal caso eliminarle. Ogni tipo di codice sql malevolo inviato verrà eliminato dalla stringa e non verrà eseguito dal db.
- Prototype Pollution: JavaScript è basato su prototipi: quando vengono creati nuovi oggetti, mantengono le proprietà e i metodi dell'“oggetto” prototipo Object, che contiene funzionalità di base come toString, constructor e hasOwnProperty.
L'ereditarietà basata su oggetti offre a JavaScript la flessibilità e l'efficienza, ma lo rende anche vulnerabile alla manomissione.
Gli attori malintenzionati possono apportare modifiche a livello di applicazione a tutti gli oggetti modificando l'Object e quindi tutti gli oggetti che lo estendono. Di questa vulnerabilità soffre anche node js: un utente può inviare come contenuto di una richiesta un oggetto:
    
    ```jsx
    {”__proto__” : { “isAdmin” : true } }
    ```
    
    Eseguendo un’istruzione del tipo:
    
    ```jsx
    obj[a][b] = value 
    // a equal to "__proto__"
    // b equal to "isAdmin" property
    // value equal to true
    ```
    
    Si va a creare un nuovo campo all’interno di Object (che tutti gli altri elementi ereditano). Se poi, in una sottoclasse di object, la proprietà isAdmin non esiste, allora il javascript engine va a cercarla direttamente nella super classe ed in questo caso il valore restituito sarà true!
    
    Per risolvere questo problema:
    
    - Si potrebbe usare il metodo Object.freeze(Object.prototype). Grazie a questa funzione si può creare un oggetto e renderlo così immutabile. Il problema è che nei moduli inclusi nel progetto (quali express) andiamo a definire nuovi campi e metodi, mandando così l’applicazione in crash. Soluzione non applicabile.
    - Validare i file JSON inviati in accordo con l’application schema. Andiamo a filtrare i campi delle richieste in formato json. Qualora dovessimo trovare valori di chiavi pericolosi (**proto**, hasOwnProperty) li elimineremo. Soluzione fattibile nel progetto ma non applicata. Nel progetto infatti andiamo ad utilizzare solamente alcuni campi specificati. Qualore venisse aggiunto nella richiesta un campo “malevolo”, questo verrebbe ignorato in quanto considerato aggiuntivo e non utile al fine di processarla.
    - Evitare di usare delle funzioni ricorsive di merge.
    - Usare oggetti senza prototipi usando Object.create(null): in questo caso andiamo a creare un oggetto che ha puntatore a prototype nullo. A differenza del metodo freeze, in questo caso l’oggetto non è immutabile: possiamo infatti aggiungere campi e metodi senza avere errori. Essendo il prototipo nullo, se cercassimo di aggiungere un nuovo campo ad Object, viene ritornato errore.
    - Usare l’oggetto Map all’interno di Object: l’oggetto req che gestisce la richiesta, contiene al suo interno un oggetto, di classe map, “body” che contiene vari campi della richiesta salvati secondo lo standard ‘key’ → ‘value’. La classe map è considerata una soluzione safe nel salvare le copie chiave valore senza esporre l’oggetto a prototype pollution.