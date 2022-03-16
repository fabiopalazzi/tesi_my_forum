# Security

La sicurezza è l’aspetto chiave dell’applicazione e del progetto di tesi. L’applicazione deve essere sicura per vari motivi:

- Per evitare un furto di dati salvati all'interno del nostro database
- Per evitare di manipolare dati dannosi inviati da utenti fittizi (hacker) che potrebbero sia colpire la nostra base dati, sia altri utenti a cui vengono inviati

L’aspetto della sicurezza verrà nella stragrande maggioranza dei casi analizzata dal back-end. È stata fatta questa scelta in quanto il front-end è un’applicativo che viene utilizzato dallo user e in quanto a contatto con esso, il funzionamento può esserne alterato. Basti pensare alla console integrata all’interno di google chrome nella quale possiamo eseguire script. O basti anche pensare a modificare un file javascript inviato. Un semplice controllo svolto con un if potrebbe ad esempio essere rimosso dall’utente andando a compromettere il tutto.

È quindi intuibile che l’aspetto della sicurezza è gestito dal back-end in particolare dall’applicativo node js. Esso infatti, è eseguito su un server esterno cui si può unicamente interagire attraverso chiamate http/REST ai vari URL gestiti. Nelle richieste inviate al server, si inviano anche parametri che possono essere contenuti nella header o nella body.

Ad esempio per aggiungere un post invocheremo una chiamata POST al back-end all’url api/post. La richiesta conterrà nella header un token Bearer la cui validità verrà verificata dal server e che certifica l’autenticazione dell’utente. Conterrà inoltre nel body vari campi quali il titolo, la descrizione, l’argomento... del post da salvare.

Dopo questo piccolo focus del funzionamento del backend possiamo intuire che è molto importante gestire accuratamente le richieste inviate per evitare problemi di sicurezza. Negli altri file inclusi nella cartella, sono presenti ulteriori spiegazioni su alcuni attachi attuabili all’app.