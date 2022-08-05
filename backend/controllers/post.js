const fs = require('fs');
const { db } = require('../models/Post');
const post = require('../models/Post');
const User = require('../models/User')


exports.getAllPosts = (req, res, next) => {
    post.find()
        .then(newPost => res.status(200).json(newPost))
        .catch(error => res.status(400).json({ error }));
};


exports.getOnePost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then(newPost => res.status(200).json(newPost))
        .catch(error => res.status(404).json({ error }));
};


exports.createPost = (req, res, next) => {
   let newPostContent = req.body.post
    const newPost = new post({ 
       ...newPostContent
        // ...postObject
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }); 
    newPost.save() 
    User.updateOne({
      _id: req.body.post.userId
  }, 
    { $push: { postOwner: req.body.post.postId } }
  )
        .then(() => res.status(201).json({ message: 'Nouveaux Post insérée avec succès !' }))
        .catch(error => res.status(400).json({ error })); 
};



exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body }
  
    post.updateOne({ _id : req.params.id}, {...postObject, _id: req.params.id})
    .then(res.status(200).json({ message : "Post modifiée"}))
    .catch(error => res.status(400).json({ error }))
  }

  exports.deletePost = (req, res, next) => {
    post.findOne({ _id : req.params.id })
    .then(post => {
      const filename = post.imageUrl.split("/images/")[1]
      fs.unlink(`images/${filename}`, () => {
        post.deleteOne({_id : req.params.id})
    .then(res.status(200).json({ message: "Post supprimée" }))
    .catch(error => res.status(400).json({ error }))
    
      })
    })
    .catch(error => res.status(500).json({ error }))
  }