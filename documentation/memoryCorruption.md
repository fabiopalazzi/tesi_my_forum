# V8 Memory Corruption and Stack Overflow

Nelle versioni di V8 fornite con Node.js 0.8 e 0.10 è stata identificata una vulnerabilità di danneggiamento della memoria, che si traduce in un denial-of-service. In determinate circostanze, un carico di lavoro ricorsivo particolarmente profondo può sovraccaricare lo stack e causare un errore di segmentazione. Ad esempio, se il tuo carico di lavoro coinvolge successive chiamate JSON.parse e gli oggetti analizzati sono molto profondi, potresti riscontrare l'interruzione del processo durante l'analisi.

Per mitigare l'analisi JSON profonda, possiamo limitare la dimensione della stringa su cui analizzi

Il module express fissa di default una dimensione massima di una richiesta ad 1MB. Se una richiesta supera tale valore, il modulo invierà un’eccezione al server (PayloadTooLargeError)

```jsx
// 1 MB = 1024^2 = 1048576
var a = ''
for(var i=0; i<5000;i++)
  a+= 'bfbfbfbfbfbffbfbfbff'
var myJSONObject = { "pwd":"b", "mail":a };
//size: 21 (header e altri campi) + 100 000 (campo mail) = 100 021 
// 100 021 < 104 576 OK
axios.post('http://127.0.0.1:3000/api/user/auth', myJSONObject)
.then(response => {
  assert.equal(200, 200)
  done()
})
//richiesta viene accettata

var a = ''
    for(var i=0; i<5500;i++)
      a+= 'bfbfbfbfbfbffbfbfbff'
    var myJSONObject = { "pwd":"b", "mail":a };
// 21 + 5500 * 20 = 110 021 > 104 576 ERROR
    axios.post('http://127.0.0.1:3000/api/user/auth', myJSONObject)
    .then(response => {
      assert.equal(200, 200)
      done()
    })
//ritornato codice 413 (PayloadTooLarge)
```

Considerando l’ambito dell’applicazione, 45 000 lettere sono più che sufficienti per gestire un articolo all’interno di un post.