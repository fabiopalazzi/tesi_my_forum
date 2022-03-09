# Password Sale

Per proteggere meglio dati sensibili quali password, non le salviamo nel database in chiaro ma le cifriamo tramite funzioni di hashing. 

Le funzioni di hashing permettono di cifrare una stringa di testo (digest) in modo da risultare illegibile ad occhi indiscreti. Dal lato teorico, una funzione di hash è una funzione non invertibile che mappa una stringa di lunghezza arbitraria in una stringa predefinita (nel nostro caso 72 Byte). 

Un problema delle funzioni di hash classiche sono gli attacchi di dizionario che sfruttano la superficialita' degli utenti che tendono ad utilizzare sempre le stesse password, generalmente di uso comune. Supponiamo di intercettare un hash di una password, ora e' abbastanza semplice confrontare questo con una serie di hash noti e identificare la password che lo ha generato.

Per ovviare a questi attacchi e' possibile aggiungere alle funzioni di hash un componente chiamato "sale”. Il sale è una sequenza casuale di bit utilizzata assieme alla password. In questo modo si complicano gli attacchi a dizionario, visto che l'aggiunta del sale cambiera' l'hash anche in caso di password di uso comune. Il valore del sale viene generalmente salvato insieme all'hash nel medesimo database, in quanto e' necessario per validare l'input durante il login.

Nel server node js sfrutto questo meccanismo grazie al modulo “cryptob” che permette di generare il “sale”, di generare il diggest unendovi il “sale” e di comparare una stringa con il diggest salvato ritornando: true in caso di uguaglianza o in caso contrario, false 

```jsx
exports.encrypt = (secret_value) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(secret_value, salt)
    return hash
}

exports.decrypt = (insert_value, diggest) => {
    //value returned is true or false
    return bcrypt.compareSync(insert_value, hash)
}
```
