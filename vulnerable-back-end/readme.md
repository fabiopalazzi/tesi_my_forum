# Vulnerable Back-end

La cartella “vulnerable-back-end” contiene una copia del backend (node js e MySql), ma senza le assunzioni di sicurezza descritte.
Il server vulnerabile sarà in locale e alla porta 3001

La finalità di questa cartella è di mostrare le vulnerabilità presenti.

Come? Nella cartella attack ci sono vari script presenti che simulano attacchi al back-end vulnerabile 

Naturalmente, prima di eseguire uno script, una volta spostati nella sotto cartella app, con il comando:

```jsx
docker-compose
```

si instanzia il back-end da attaccare

Ogni script è eseguibile, dopo essersi spostati nella cartella attack, da terminale eseguendo il comando:

```jsx
	node nome_dello_script.js
```

Alcuni di questi script devono essere prima configurati e poi eseguiti.

Ad esempio in sql_injection.js dobbiamo inserire un token valido prima di eseguire alcuni attacchi, altrimenti alcuni di essi falliranno ritornando il codice 403 o 401
