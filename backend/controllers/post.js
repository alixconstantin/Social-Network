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

let newPostContent = {
        userId:  req.body.userId,
        postId: req.body.postId,
        userName: req.body.userName,
        postUrl: req.body.postUrl,
        postText: req.body.postText,
        imageName: req.body.imageName
}
  let newPost;
if ( req.file !== undefined ) {
  newPost = new post({
    ...newPostContent,
    imageUrl : `${req.protocol}://${req.get('host')}/${req.file.filename}`
  });
  newPost.save()
  
  User.updateOne({
      _id: req.body.userId
    }, {
      $push: {
        postOwner: req.body.postId
      }
    })
    .then(() => res.status(201).json({
      message: 'Nouveaux Post insérée avec succès !'
    }))
    .catch(error => res.status(400).json({
      error
    })); 
}else {

  newPost = new post({
    ...newPostContent,
  });
  newPost.save()
  
  User.updateOne({
      _id: req.body.userId
    }, {
      $push: {
        postOwner: req.body.postId
      }
    })
    .then(() => res.status(201).json({
      message: 'Nouveaux Post insérée avec succès !'
    }))
    .catch(error => res.status(400).json({
      error
    })); 

}
 
 
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
 
  let newPostContent = {
    userId:  req.body.userId,
    postId: req.body.postId,
    userName: req.body.userName,
    postUrl: req.body.postUrl,
    postText: req.body.postText,
    imageName: req.body.imageName
}
if (newPostContent.postText == 'undefined' ){
  newPostContent.postText =''
}
  const postUpdate = {
    ...newPostContent,
    
  }
  if(req.file !== undefined){
    var imageUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`
  }


  post.updateOne({
      postId: postUpdate.postId,
    }, {
      $set: {
        "postText": postUpdate.postText,
        "postUrl": postUpdate.postUrl,
        "imageUrl": imageUrl
      }
    })
    .exec()
    .then(() => res.status(200).json({
      message: 'Objet modifié !'
    }))
    .catch(error => console.log(error))
}

/*
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

*/

exports.deletePost = (req, res, next) => {

  post.findOne({ postId: req.params.id })
  .then(post => {
    
    console.log(req.params.id)
    post.deleteOne({postId: req.params.id})
    .then(res.status(200).json({ message: "Post supprimée" }))
    .catch(error => res.status(400).json({ error }))
    const filename = post.imageUrl.split("/")[1]
    console.log(filename)
   fs.unlink(`${filename}`, () => {
      post.deleteOne({postId: req.params.id})

    }) 
  })
  .catch(error => res.status(500).json({ error }))
} 