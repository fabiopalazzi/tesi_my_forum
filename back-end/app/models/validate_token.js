const connection = require('../models/db')

exports.validToken = ((req, res, _callback) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ')
    if (bearer[0] == "Bearer") {
        const bearerToken = bearer[1];
        //control bearer token is valid
        const sql = `SELECT user_id
                    FROM user_access
                    WHERE token = ?;`
        connection.query(sql, [
            bearerToken
        ], function (err, result) {
        if (err) res.sendStatus(403)
        else if (result.length == 0 ) res.sendStatus(401)
        //if all is ok call function specified to manage data
        else _callback(result[0].user_id, req, res)
    })
    }else{
        res.sendStatus(422)
    }
})