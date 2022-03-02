const connection = require('./db')
const crypto = require('crypto')
const UserToken = require('./UserToken')
const token_verification = require('./validate_token')

//check user credential
exports.checkUser = ((req, res)=>{
    const sql = `SELECT * FROM user
                WHERE mail=` + connection.escape(req.body.mail) + ` AND
                PASSWORD ='` + crypto.createHash('sha256').update(req.body.pwd).digest('base64') + `';`;            
    connection.query(sql, function (err, result) {
      if (err || result.length==0)
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
              `(` + connection.escape(req.body.mail) + `,` +
              `'` + crypto.createHash('sha256').update(req.body.pwd).digest('base64') + `',` +
              connection.escape(req.body.name) + `,` +
              connection.escape(req.body.surname) + `,` +
              connection.escape(req.body.country) + `);`;
  connection.query(sql, function (err, result, fields) {
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
  const sql = `SELECT COUNT(*) as num FROM user ` + 
              `WHERE mail='` + user_id + `' AND password='` +  
              crypto.createHash('sha256').update(req.body.old_pwd).digest('base64') + `';`
  connection.query(sql, function (err, result) {
    if (err) res.status(301).send({message: 'Password errata!'})
    else if(result[0].num!=1) res.status(301).send({message: 'Password errata!'})
    else{ //password is corretct
      const sql = `UPDATE user SET password = '` + 
      crypto.createHash('sha256').update(req.body.new_pwd).digest('base64') + 
      `' WHERE mail='` + user_id + `';`
      connection.query(sql, function (err, result) {
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
  const sql = `UPDATE user SET name = ` + connection.escape(req.body.name) + ` WHERE mail='` + user_id + `';`
  connection.query(sql, function (err, result) {
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
  const sql = `UPDATE user SET surname = ` + connection.escape(req.body.surname) + ` WHERE mail='` + user_id + `';`
  connection.query(sql, function (err, result) {
    if (err) res.sendStatus(403)
    else if(result.affectedRows==0) res.sendStatus(404)
    else res.sendStatus(200)
    })
}

