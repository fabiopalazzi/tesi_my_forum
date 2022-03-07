const connection = require('./db')
const token_verification = require('./validate_token')

exports.addComment = ((req, res) => {
    if(req.body.description.length==0)  res.send(403) //check content is not empty
    else token_verification.validToken(req, res, insertComment)
})
function insertComment(user_id, req, res){
    const sql = `INSERT INTO comment_content (creation_date, description, post_id, user_id )` +
                ` VALUES ('` + new Date().toISOString().slice(0, 19).replace('T', ' ') + `',
                ?, ?,'` + user_id + `');`
    connection.query(sql, 
        [
            req.body.description,
            req.body.post_id
        ],
        function (err, result) {
        if (err) res.sendStatus(403)
        else res.sendStatus(200)
    })
}


exports.getComment = ((req, res) => {
    token_verification.validToken(req, res, searchLastComment)
})
function searchLastComment(user_id, req, res){
    const sql = `SELECT name, surname, id, description ` +
                `FROM comment_content C` +
                ` JOIN user U ON U.mail = C.user_id` +
                ` WHERE post_id=?
                ORDER BY creation_date DESC;`
    connection.query(sql, [req.params.post_id], function (err, result) {
        if (err) res.sendStatus(403)
        else res.send(JSON.stringify(result))
    })
}