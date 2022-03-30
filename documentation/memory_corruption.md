# V8 Memory Corruption and Stack Overflow

Nelle versioni di V8 fornite con Node.js 0.8 e 0.10 è stata identificata una vulnerabilità di danneggiamento della memoria, che si traduce in un denial-of-service. In determinate circostanze, un carico di lavoro ricorsivo particolarmente profondo può sovraccaricare lo stack e causare un errore di segmentazione. Ad esempio, se il tuo carico di lavoro coinvolge successive chiamate JSON.parse e gli oggetti analizzati sono molto profondi, potresti riscontrare l'interruzione del processo durante l'analisi.

Per mitigare l'analisi JSON profonda, possiamo limitare la dimensione della stringa su cui analizzi

Il module body-parser fissa di default una dimensione massima di una richiesta a 100KB. Se una richiesta supera tale valore, il modulo invierà un’eccezione al server (PayloadTooLargeError)

```jsx
// 100KB = 2^10 * 100 BYTE = 102 400 BYTE
var a = ''
for(var i=0; i<5000;i++)
  a+= 'bfbfbfbfbfbffbfbfbff'
var myJSONObject = { "pwd":"b", "mail":a };
//size: 21 (header e altri campi) + (circa) 100 000 = 100 021 
// 100 021 < 102 400  OK
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
// 21 + 5500 * 20 = 110 021 > 102 400 ERROR
    axios.post('http://127.0.0.1:3000/api/user/auth', myJSONObject)
    .then(response => {
      assert.equal(200, 200)
      done()
    })
//ritornato codice 413 (PayloadTooLarge)
```

Considerando l’ambito dell’applicazione, 45 000 lettere sono più che sufficienti per gestire un articolo all’interno di un post.