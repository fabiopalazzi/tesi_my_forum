const User = require('../models/User')
const UserToken = require('../models/UserToken')
const Post = require('../models/Post')
const LikeContent = require('../models/Like')
const CommentContent = require('../models/Comment')
const emailValidator = require('../validator/emailValidator')

//** USER  */
exports.login = (req, res) => {
    if(req.body.mail == undefined || req.body.mail.length == 0 || 
        req.body.pwd == undefined || req.body.pwd.length == 0)
        res.status(400).send({
            message: 'Compilare tutti i campi'
        })
    else User.checkUser(req,res)
}
exports.logout = (req, res) => {
    //no body control, only AUTH_BEARER is sent
    UserToken.deleteToken(req, res)
}
exports.checkToken = (req, res) => {
    //no body control, only AUTH_BEARER is sent
    UserToken.checkToken(req,res)
}
exports.register = (req, res) => {
    if(emailValidator.isEmailValid(req.body.mail))
        if((req.body.name != undefined && req.body.name.length > 0) &&
        (req.body.surname != undefined && req.body.surname.length > 0) &&
        (req.body.pwd != undefined && req.body.pwd.length > 0))
            User.addUser(req,res)
        else
            res.status(400).send({
                message: 'Compilare tutti i campi'
        });
    else
        //email is not valid
        res.status(400).send({
            message: 'Mail non valida'
        });
}
exports.updateName = ((req,res) => {
    if(req.body.name != undefined && req.body.name.length>0)
        User.updateName(req,res)
    else
        res.status(400).send({
            message: "Il nome non può essere vuoto!"
        })
})
exports.updateSurname = ((req,res) => {
    if(req.body.surname != undefined && req.body.surname.length>0)
        User.updateSurname(req,res)
    else
        res.status(400).send({
            message: "Il cognome non può essere vuoto!"
        })
})
exports.updatePwd = ((req,res) => {
    if(req.body.new_pwd == undefined || req.body.new_pwd.length == 0) 
        res.sendStatus(400)
    else User.updatePwd(req,res)
}) //** end USER API */


//** POST */
exports.addPost = (req, res) => {
    if(req.body.title == undefined || req.body.title.length == 0 || 
        req.body.topic == undefined || req.body.topic.length == 0 || 
        req.body.description == undefined || req.body.description.length == 0)
        res.status(400).send({
            message: "Errore, compilare tutti i campi!"
        })
    else Post.addPost(req, res)   
}
exports.deletePost = (req, res) => {
    Post.deletePost(req, res)   
}
exports.getLastPost = (req, res) => {
    Post.getLastPost(req, res)
}

exports.getSearchedPost = (req, res) => {
    Post.getSearchedPost(req,res)
}//** end POST API */

//** LIKE */
exports.addLike = (req, res) => {
    if(req.body.post_id == undefined || req.body.post_id.length == 0)
        res.status(400).send({
            message: 'Id non valido!'
        })
    else LikeContent.addLike(req,res)
}
exports.removeLike = (req, res) => {
    if(req.body.like_id == undefined || req.body.like_id.length == 0)
        res.status(400).send({
            message: 'Id non valido!'
        })
    else LikeContent.removeLike(req,res)
}//** end LIKE API */

//** COMMENT */
exports.getComment = (req, res) => {
    CommentContent.getComment(req,res)
}
exports.addComment = (req, res) => {
    if(req.body.post_id == undefined || req.body.post_id.length == 0 || 
    req.body.description == undefined || req.body.description.length == 0)
        res.status(400).send({
            message: 'Contenuto non valido!'
        })
    else CommentContent.addComment(req,res)
} //** end COMMENT API */