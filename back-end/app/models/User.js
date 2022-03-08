const connection = require('./db')
const hashAndSale = require('../hash/hash_and_sale.js')
const UserToken = require('./UserToken')
const token_verification = require('./validate_token')

//check user credential
exports.checkUser = ((req, res)=>{
    connection.query(`SELECT * FROM user
      WHERE mail= ?`,
      [
        req.body.mail,
      ],
      function (err, result) {
      if (err || result.length==0 || !hashAndSale.decrypt(req.body.pwd, result[0].password))
        res.status(401).send({
          message: 'Dati non validi'
        }) //non autorizzato
      else{
          //create token to user
          UserToken.createUserToken(req.body.mail, res, result[0])
      }
    })
}) 

//register user
exports.addUser = (req, res) => {
  const sql = `INSERT INTO user (mail, password, name, surname, country) VALUES ` + 
              `( ?, ?, ?, ?, ?);`;
  connection.query(sql,
    [
      req.body.mail,
      hashAndSale.encrypt(req.body.pwd),
      req.body.name,
      req.body.surname,
      req.body.country
    ],
    function (err, result, fields) {
      if (err) res.status(403).send({
        message: 'Attenzione! I valori inseriti sono probabilmente errati o la mail è già stata utilizzata!'
      })
      else res.sendStatus(200)
  })
}

// ** UPDATE METHODS! */
exports.updatePwd = ((req, res) => {
  token_verification.validToken(req, res, updateAuthPwd)
})
function updateAuthPwd(user_id, req,res){
  //check old password
  const sql = `SELECT * FROM user ` + 
              `WHERE mail='` + user_id + `';`
  connection.query(sql, 
    function (err, result) {
      if (err || !hashAndSale.decrypt(req.body.old_pwd, result[0].password)) //pwd not valid
        res.status(301).send({message: 'Password errata!'})
      else{ //password is correct
        const sql = `UPDATE user SET password = ?` +
        ` WHERE mail='` + user_id + `';`
        connection.query(sql, [
          hashAndSale.encrypt(req.body.new_pwd)
        ], function (err, result) {
          if (err) res.status(403).send({message: 'Errore, riprova!'})
          else if(result.affectedRows==0) res.status(404).send({message: 'Password non cambiata'})
          else res.sendStatus(200)
          })
      }
  })
}

 //** UPDATE NAME */
exports.updateName = ((req, res) => {
  token_verification.validToken(req, res, updateAuthName)
})
function updateAuthName(user_id, req, res){
  const sql = `UPDATE user SET name =? WHERE mail='` + user_id + `';`
  connection.query(sql,
    [req.body.name],
    function (err, result) {
    if (err) res.sendStatus(403)
    else if(result.affectedRows==0) res.sendStatus(404)
    else res.sendStatus(200)
    })
}

 //** UPDATE SURNAME */
exports.updateSurname = ((req, res) => {
  token_verification.validToken(req, res, updateAuthSurname)
})
function updateAuthSurname(user_id, req, res){
  const sql = `UPDATE user SET surname = ? WHERE mail='` + user_id + `';`
  connection.query(sql,
    [req.body.surname],
    function (err, result) {
    if (err) res.sendStatus(403)
    else if(result.affectedRows==0) res.sendStatus(404)
    else res.sendStatus(200)
    })
}

