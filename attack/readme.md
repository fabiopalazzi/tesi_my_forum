# Attack Folder

Questa cartella contiene script per attaccare il back-end e sottrarre informazioni o dati sensibili o eludere alcuni meccanismi di sicurezza.

Troviamo script divisi per tipologia di attacco.

Troviamo anche una cartella source contenente un file txt contente una lista di password da utilizzare per l’attacco brute force.

Gli attacchi sono efficaci al back-end vulnerabile ed in quanto tale le richieste http/REST sono destinate all’indirizzo: 127.0.0.1:3001

Prima di eseguire gli attacchi:

- All’interno della cartella vulnerable-back-end

```jsx
docker-compose up
```

- All’interno della cartella attack digitare

```jsx
npm install --save
```

- Eseguire lo script digitando:

```jsx
node nome_script
```

Attenzione! Prima di eseguire qualsiasi script leggerne la documentazione! Può essere richiesta la configurazione di alcuni parametri in modo che l’attacco abbia successo
