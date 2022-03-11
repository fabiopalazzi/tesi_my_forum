const connection = require('./db')
const token_verification = require('./validate_token')

exports.addLike = ((req,res) => {
    token_verification.validToken(req, res, insertLikeAuth)
})

function insertLikeAuth(user_id, req, res){
    const sql  = `INSERT INTO like_content (post_id, user_id)
                VALUES ('` + req.body.post_id + `','` + user_id + `');`
    connection.query(sql, function (err, result) {
        if (err) res.sendStatus(403)
        else res.send(JSON.stringify(result))
    })
}

exports.removeLike = ((req, res) => {
    token_verification.validToken(req, res, deleteLikeAuth)
})

function deleteLikeAuth(user_id, req, res){
    const sql  = `DELETE FROM like_content WHERE id=` + req.body.like_id + `;`
    connection.query(sql, function (err, result) {
        if (err) res.sendStatus(403)
        else res.send(JSON.stringify(result))
    })
}


exports.getLikePost = ((req, res) => {
})