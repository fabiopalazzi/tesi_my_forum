const connection = require('./db')
const _token = require('./create_random_token')

exports.getUserToken = (req, res) => {
    
}

exports.createUserToken = (user_id, res, user_info) => {
    const created = new Date()
    const expired = new Date()
    const _auth_token = _token.getToken()
    expired.setDate(expired.getDate() + 3)
    
    const sql = `INSERT INTO user_access (token, creation_date, expired_date, user_id)
                VALUES ('` + _auth_token + `','`+
                created.toISOString().slice(0, 19).replace('T', ' ') + `','` + 
                expired.toISOString().slice(0, 19).replace('T', ' ') + `','` + 
                user_id + `')`
    connection.query(sql, function (err, result, fields) {
        if (err) res.sendStatus(403)
        else //send toke, name and surname to save to client
            res.send(`{"token":"` + _auth_token + `","name":"` + user_info.name + `","surname":"` + user_info.surname + `"}`)
    })
}

//logout/delete access token
exports.deleteToken = ((req, res) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ')
    if (bearer[0] == "Bearer") {
        const bearerToken = connection.escape(bearer[1]);
        //control bearer token is valid
        const sql = `DELETE FROM user_access
                    WHERE token = ` + bearerToken + `;`
        connection.query(sql, function (err, result) {
        if (err) res.sendStatus(403)
        if (result.affectedRows == 0 ) res.sendStatus(401)
        //if all is ok call function specified to manage data
        else res.sendStatus(200)
    })
    }else{
        res.sendStatus(422)
    }
})

//Check if token is valid
exports.checkToken = ((req,res) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ')
    if (bearer[0] == "Bearer") {
        const bearerToken = connection.escape(bearer[1]);
        //control bearer token is valid
        const sql = `SELECT COUNT(*) as line_count FROM user_access WHERE token= ` + bearerToken + `
          AND expired_date >= '` + new Date().toISOString().slice(0, 19).replace('T', ' ') + `';`
        connection.query(sql, function (err, result) {
        if (err) res.sendStatus(403)
        else if (result!= null && result[0].line_count == "1") res.sendStatus(200)
        else res.sendStatus(401)
    })
    }else{
        res.sendStatus(422)
    }
})