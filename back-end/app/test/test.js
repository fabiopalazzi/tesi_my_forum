assert = require ('assert')
http = require ('http')
const { response } = require('express');
var request = require('request');
var axios = require('axios')

describe('Server status and Message', function () {
  //test is main page is not down
  it('status response should be equal 200', function (done) {
        http.get('http://127.0.0.1:3000/', function (response) {
              assert.equal(response.statusCode, 200)
              done()
        });
    });
  
  //test auth call
  it('post example', function (done) {
    //sql inj ex "mail":"b' OR mail LIKE '%a%"
    //non va bene ne mail ne password perchè i campi li uso dopo e quindi fallisce
    var myJSONObject = { "pwd":"b", "mail":"b" };
    axios.post('http://127.0.0.1:3000/api/user/auth', myJSONObject)
    .then(response => {
      assert.equal(response.status, 200)
      done()
    })
  });
  
  //test get auth call
  it('post example', function (done) {
    //sql inj ex "mail":"b' OR mail LIKE '%a%"
    //non va bene ne mail ne password perchè i campi li uso dopo e quindi fallisce
    var token = ""; for(var i=0;i<128;i++) token+="a"; token+=" '; DROP TABLE like_content; -- "
    console.log(token)
    axios.get('http://127.0.0.1:3000/api/user/auth', { headers: { Authorization: `Bearer ` + token }})
    .then(response => {
      assert.equal(response.status, 200)
      done()
    })
  });
});