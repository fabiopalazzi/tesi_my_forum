const connection = require('./db')
const token = require('./create_random_token')
const token_verification = require('./validate_token')

exports.addPost = (req,res) => {
    token_verification.validToken(req, res, insertPostAuth)
}
//** QUERY MANAGE POST AFTER TOKEN HAS BEEN VALIDATED*/
//insert post query
function insertPostAuth(user_id, req, res){
    const sql = `INSERT INTO post VALUES ('` + 
                token.getToken() + `','` + 
                new Date().toISOString().slice(0, 19).replace('T', ' ') + `','` + 
                req.body.topic + `','` + 
                req.body.title + `','` +
                req.body.description + `','` + 
                user_id + `');`
    connection.query(sql, function (err, result) {
    if (err) res.sendStatus(403)
    else res.sendStatus(200)
    })
}

exports.deletePost = (req,res) => {
    token_verification.validToken(req, res, deletePostAuth)
}
//delete post
function deletePostAuth(user_id, req, res){
    const sql = `DELETE FROM post WHERE post_id='` + req.body.post_id + `' AND user_id = '` + user_id + `';`
    connection.query(sql, function (err, result) {
    if (err) res.sendStatus(403)
    else if(result.affectedRows==0) res.sendStatus(404)
    else res.sendStatus(200)
    })
}

exports.getLastPost = (req, res) => {
    token_verification.validToken(req, res, getLastPost)
}
//get last 10 post
function getLastPost(user_id, req, res){  
    const sql = `SELECT P.post_id, P.topic, P.title, P.description, P.user_id, U.name, U.surname,
            (
                SELECT COUNT(*) FROM like_content
                WHERE post_id = P.post_id
            ) AS like_count,
            (
                SELECT id FROM like_content
                WHERE post_id = P.post_id AND
                user_id = '` + user_id + `'
            ) AS id_like,
            (
                SELECT COUNT(*) FROM comment_content
                WHERE post_id = P.post_id
            ) AS comment_count
            FROM ( 
            SELECT post_id, topic, title, description, user_id FROM post
            ORDER BY creation_date
            LIMIT 10 OFFSET ` + req.params.offset + 
            `) P INNER JOIN user U ON U.mail = P.user_id;`
    connection.query(sql, function (err, result) {
        if (err) res.sendStatus(403)
        else res.send(JSON.stringify(result))
    })
}

exports.getSearchedPost  = (req, res) => {
    token_verification.validToken(req, res, getSearchedPost)
}
function getSearchedPost(user_id, req, res){
    const sql = `SELECT P.post_id, P.topic, P.title, P.description, P.user_id, U.name, U.surname,
    (
        SELECT COUNT(*) FROM like_content
        WHERE post_id = P.post_id
    ) AS like_count,
    (
        SELECT id FROM like_content

        WHERE post_id = P.post_id AND
        user_id = '` + user_id + `'
    ) AS id_like,
    (
        SELECT COUNT(*) FROM comment_content
        WHERE post_id = P.post_id
    ) AS comment_count
    FROM ( 
    SELECT post_id, topic, title, description, user_id FROM post
    WHERE CONCAT(title,topic,description) LIKE '%` + req.params.search_text + `%'
    ORDER BY creation_date
    LIMIT 10 OFFSET ` + req.params.offset + `
    ) P INNER JOIN user U ON U.mail = P.user_id;`
    connection.query(sql, function (err, result) {
        if (err) res.sendStatus(403)
        else res.send(JSON.stringify(result))
    })
}