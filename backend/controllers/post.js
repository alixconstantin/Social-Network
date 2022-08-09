const fs = require('fs');
const post = require('../models/Post');
const User = require('../models/User')


exports.getAllPosts = (req, res, next) => {
  post.find()
    .then(newPost => res.status(200).json(newPost))
    .catch(error => res.status(400).json({
      error
    }));
};


exports.getOnePost = (req, res, next) => {
  console.log(req.params)
  post.findOne({
      postId: req.params.id
    })
    .then(newPost => res.status(200).json(newPost))
    .catch(error => res.status(404).json({
      error
    }));
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
    }, {
      $push: {
        postOwner: req.body.post.postId
      }
    })
    .then(() => res.status(201).json({
      message: 'Nouveaux Post insérée avec succès !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};

exports.likeAPost = (req, res, next) => {
  let userLikeId = req.body.userID
  let postIdd = req.body.postID

  post.find({
    postId: postIdd
  }, function (err, docs) {
    if (docs[0].likes.includes(userLikeId)) {
      post.updateOne({
           postId: postIdd
        }, {
          $pull: {
            likes: userLikeId
          }
        }).exec()
        .then(() => res.status(200).json({
          message: 'Like Supprimé!'
        }))
        .catch(error => console.log(error))

    } else {
      post.updateOne({
          postId: postIdd
        }, {
          $push: {
            "likes": userLikeId
          }
        })
        .exec()
        .then(() => res.status(200).json({
          message: 'Like Ajouté!'
        }))
        .catch(error => console.log(error))
    }
  });

  /*
   */
}

exports.updatePost = (req, res, next) => {
  const postUpdate = {
    ...req.body
  }
  //  console.log(postUpdate.post.postId)
  post.updateOne({
      postId: postUpdate.post.postId,
    }, {
      $set: {
        "postText": postUpdate.post.postText,
        "postUrl": postUpdate.post.postUrl
      }
    })
    .exec()
    .then(() => res.status(200).json({
      message: 'Objet modifié !'
    }))
    .catch(error => console.log(error))
}


exports.deletePost = (req, res, next) => {
  post.deleteOne({
    postId: req.params.id
  }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

/*
exports.deletePost = (req, res, next) => {

  post.findOne({ _id : req.params.id })
  .then(post => {
    console.log(req.params.id)
    post.deleteOne({_id : req.params.id})
    .then(res.status(200).json({ message: "Post supprimée" }))
    .catch(error => res.status(400).json({ error }))


    //const filename = post.imageUrl.split("/images/")[1]
   /* fs.unlink(`images/${filename}`, () => {
      post.deleteOne({_id : req.params.id})
  .then(res.status(200).json({ message: "Post supprimée" }))
  .catch(error => res.status(400).json({ error }))
  
    })
  })
  .catch(error => res.status(500).json({ error }))
} */