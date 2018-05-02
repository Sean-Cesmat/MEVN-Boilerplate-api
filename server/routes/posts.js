var express = require('express');
var router = express.Router();
var Post = require("../models/posts")

router.get('/user/:userId', (req, res) => {
  Post.find({author: req.params.userId}, 'title description', function(error, posts) {
    if (error) { console.log(error) }
    res.send({
      posts: posts
    })
  }).sort({_id: -1})
})

router.post('/', (req, res) => {
  var db = req.db;
  var author = req.body.author;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    author: author,
    title: title,
    description: description
  })

  new_post.save(function(error) {
    if (error) {
      console.log(error)
    }
    res.send({
      seccess: true,
      message: 'Post saved successfully!'
    })
  })
})

router.get('/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', function(error, post) {
    if (error) {
      console.log(error);
    }
    res.send(post)
  })
})

// Update a post
router.put('/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }

    post.title = req.body.title
    post.description = req.body.description
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
router.delete('/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


// END '/' Route



module.exports = router;
