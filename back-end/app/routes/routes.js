const controller = require('../controllers/controllers')
const express = require('express')

const { check} = require('express-validator');

const router = express.Router()

//** MAIN PAGE  **  //
router.get('/', (req, res) => {
    res.send('Server MyForum is ON')
  })

// ** USER  ** //
//login
router.post('/api/user/auth/', controller.login)

//logout
router.delete('/api/user/auth/', controller.logout)

//Check token validity
router.get('/api/user/auth', controller.checkToken)

//register
router.post('/api/user/register/',
            check('name').escape(),
            check('surname').escape(),
            controller.register)

//update name
router.put('/api/user/name', check('name').escape(), controller.updateName)

//update surname
router.put('/api/user/surname', check('surname').escape(), controller.updateSurname)

//update pwd
router.put('/api/user/pwd', controller.updatePwd)

// ** POST ** //
//add post
router.post('/api/post/', 
            check('title').escape(), 
            check('topic').escape(), 
            check('description').escape(),
            controller.addPost)

//delete post
router.delete('/api/post/', controller.deletePost)

//get last 10 post with offset
router.get('/api/post/:offset', controller.getLastPost)

//get searched post
router.get('/api/post/:offset/:search_text', controller.getSearchedPost)

// ** LIKE CONTENT **/
//add like [NO ESCAPE BECAUSE ID IS AN INTEGER VALUE]
router.post('/api/like/', controller.addLike)

//remove like
router.delete('/api/like/', controller.removeLike)

// ** COMMENT CONTENT **/
//get comment to POST
router.get('/api/comment/:post_id', controller.getComment)

//add like
router.post('/api/comment/', check('description').escape(), controller.addComment)

module.exports = router;