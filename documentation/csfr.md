# CSFR attack

È un attacco che costringe un utente finale a eseguire azioni indesiderate su un'applicazione Web in cui è attualmente autenticato. Questa azione indesiderata viene eseguita quando un utente visita un sito dannoso di terze parti. 

Un hacker fa in modo che un utente vittima invii involontariamente una richiesta HTTP dal suo browser al sistema web in cui è attualmente autenticato; il sistema, vulnerabile al CSRF, avendo la certezza che la richiesta provenga dall'utente già precedentemente autenticato la esegue senza sapere che in realtà dietro di essa si cela un'azione pensata dall'attaccante, come per esempio un trasferimento di fondi, un acquisto di un oggetto, una richiesta di dati o qualsiasi altra funzione offerta dall'applicazione vulnerabile. Ci sono innumerevoli modi coi quali un utente può essere ingannato nell'inviare una richiesta pensata da un attaccante a un server web, per esempio nascondendo la richiesta in un elemento HTML come un'immagine, un'XMLHttpRequest o un URL.

Supponiamo che l'utente A si sia autenticato al sito “www.ilmiocontobancario.it” per l'accesso alle operazioni sul suo conto bancario. Il sito “www.ilmiocontobancario.it” ha un form
 per i versamenti che, nel momento in cui invieremo i dati, richiederà una pagina del tipo ”*www.ilmiocontobancario.it/versamento?importo=XXXX&destinatario=XXXX*
;” ad esempio: l'utente B invia ad A, eventualmente attraverso la sua email
, un tag img html al fine di caricare automaticamente il contenuto del link come se fosse un'immagine come il seguente: 

```html
<IMG src='www.ilmiocontobancario.it/... versamento?importo=1000E&destinatario=B'>
```

Quando A tenterà di accedere all'immagine, il browser invierà di fatto una richiesta HTTP alla pagina web indicata cercando di caricare l'immagine. Il sito *www.ilmiocontobancario.it* rileverà, tramite il cookie, che la richiesta arriva effettivamente da A e perciò autorizzerà l'operazione.

Questo attacco sfrutta quindi una vulnerabilità relativa ai cookie: quando inviamo una richiesta verso un server, tutti i cookie salvati nel browser associabili a quell’URL, vengono automaticamente inviati.

Nel caso del front-end sviluppato all’interno del progetto, ho deciso di salvare il token di session nella memoria “localStorage”. 

## Svantaggio

Memorizzando il token in localStorage, il suo valore è facilmente ottenibile da codice javascript. Questo, lo rende vulnerabile ad attacchi XSS ovvero codice javascript iniettato in documenti html da un utente attaccante ed eseguito automaticamente dalla vittima. Tuttavia siamo protetti da questo attacco attraverso una sanificazione dei caratteri inseriti. [Approfondimento xss](https://github.com/fabiopalazzi/tesi_my_forum/blob/master/documentation/xss.md)

## Vantaggio

Quando effettuiamo il login, il token viene memorizzato nel localStorage del front-end. Se provassimo ad accedere da un altra tab del browser al token, il valore ritornato sarebbe undefined. LocalStorage salva i valori usando come chiave l’url del front-end. Se un utente malevolo volesse attaccarci tramite CSFR, inviando una richiesta da un URL diverso da quello del front-end, esso non riuscurà ad ottenere il valore del token di sessione e perciò l’attacco fallirà. Utilizzando localStorage siamo quindi difesi da attacchi CSFR.

Viceversa un cookie memorizza i suoi valori nel browser usando come chiave l’url del back-end. Qualora venisse eseguito un attacco CSFR dal browser della vittima (da una pagina diversa da quella del front-end), i valori dei cookie associati all’URL del back-end verranno inviati automaticamente, rendendo così la richiesta corretta.