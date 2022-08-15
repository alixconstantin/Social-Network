
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);

 router.post('/like', postCtrl.likeAPost);

router.post('/',  multer, postCtrl.createPost);

router.delete('/delete/:id', multer, postCtrl.deletePost);

router.put('/:id', multer, postCtrl.updatePost);


module.exports = router; 