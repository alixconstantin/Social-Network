
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);

router.get('/:id', postCtrl.getOnePost);

router.post('/', multer, postCtrl.createPost);

/*
router.post('/:id/like', auth, postCtrl.likePost); // Actualy commented, need the Ctrl for no making bugs
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, multer, postCtrl.deletePost);
*/
module.exports = router; 