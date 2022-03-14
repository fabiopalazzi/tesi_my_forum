# Prototype Pollution

JavaScript è basato su prototipi: quando vengono creati nuovi oggetti, mantengono le proprietà e i metodi dell' “oggetto” prototipo Object, che contiene funzionalità di base come toString, constructor e hasOwnProperty.
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