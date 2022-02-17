const User = require('../models/User')
const UserToken = require('../models/UserToken')
const Post = require('../models/Post')
const LikeContent = require('../models/Like')
const CommentContent = require('../models/Comment')

//** USER  */
exports.login = (req, res) => {
    if(req.body.mail.length == 0 || req.body.pwd.length == 0)
        res.sendStatus(301)
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
    if(req.body.mail != '' &&
    req.body.pwd != '' &&
    req.body.name != '' &&
    req.body.surname != '')
        User.addUser(req,res)
    else
        res.sendStatus(301)
}
exports.updateName = ((req,res) => {
    if(req.body.name.length == 0)
        res.sendStatus(301)
    else User.updateName(req,res)
})
exports.updateSurname = ((req,res) => {
    if(req.body.surname.length == 0)
        res.sendStatus(301)
    else User.updateSurname(req,res)
})
exports.updatePwd = ((req,res) => {
    if(req.body.old_pwd.length == 0 || req.body.old_pwd.length == 0) 
        res.sendStatus(301)
    else User.updatePwd(req,res)
}) //** end USER API */


//** POST */
exports.addPost = (req, res) => {
    if(req.body.title.length == 0 || req.body.topic.length == 0 || req.body.description.length == 0)
        res.sendStatus(301)
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
    if(req.body.post_id.length == 0)
        res.sendStatus(301)
    else LikeContent.addLike(req,res)
}
exports.removeLike = (req, res) => {
    if(req.body.like_id.length == 0)
        res.sendStatus(301)
    else LikeContent.removeLike(req,res)
}//** end LIKE API */

//** COMMENT */
exports.getComment = (req, res) => {
    CommentContent.getComment(req,res)
}
exports.addComment = (req, res) => {
    if(req.body.post_id.length == 0 || req.body.description.length == 0)
        res.sendStatus(301)
    else CommentContent.addComment(req,res)
} //** end COMMENT API */