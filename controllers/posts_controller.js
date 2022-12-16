const { body, validationResult, check } = require('express-validator');
const Post = require('../models/post');
const Comment = require('../models/comment');
const e = require('express');

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${location}[${param}]: ${msg}`;
};

// Returns all published posts as array in JSON with most recent first
exports.posts_all = async (req, res, next) => {
  try {
    const allPosts = await Post.find({ published: true }).sort({ posted: -1 });
    res.json({
      posts: allPosts,
    });
  } catch (err) {
    return next(err);
  }
};

// Returns JSON of individual post
exports.get_post = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json({
      post: post,
    });
  } catch (err) {
    return next(err);
  }
};

exports.get_comments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postRef: req.params.postId });

    if (comments) {
      res.json(comments);
    } else {
      res.send('There are no comments for this post');
    }
  } catch (err) {
    return next(err);
  }
};

// Create blog-post on POST
exports.post_create_post = [
  // Validate the inputs
  body('title')
    .isLength({ min: 1 })
    .withMessage('Title must be at least 1 character')
    .isLength({ max: 200 })
    .withMessage('Title must be less than 200 characters')
    .trim()
    .escape(),

  body('content')
    .isLength({ min: 1 })
    .withMessage('Content must be at least 1 character')
    .isLength({ max: 200 })
    .withMessage('Title must be less than 20,000 characters')
    .trim()
    .escape(),

  async (req, res, next) => {
    const validationErrors = validationResult(req).formatWith(errorFormatter);

    if (!validationErrors.isEmpty()) {
      res.status(401).json(validationErrors);
    }

    try {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        posted: new Date(),
        published: req.body.published,
      });

      await post.save();
      res.send('Success - post saved');
    } catch (err) {
      return next(err);
    }
  },
];

exports.create_comment = [
  // Validate and santise inputs
  body('content')
    .isLength({ min: 1 })
    .withMessage('Comment text missing')
    .isLength({ max: 3000 })
    .withMessage('Exceeds size is 5000 characters')
    .trim()
    .escape(),

  body('username', 'Username must be less than 20 characters')
    .isLength({ max: 19 })
    .trim()
    .escape(),

  // Handle request
  async (req, res, next) => {
    const validationErrors = validationResult(req).formatWith(errorFormatter);

    if (!validationErrors.isEmpty()) {
      res.status(401).json(validationErrors);
    }

    try {
      const comment = new Comment({
        content: req.body.content,
        username: 'Chris',
        posted: new Date(),
        postRef: req.params.postId,
      });

      // Check to ensure parent post exists
      const post = await Post.findById(req.params.postId);
      if (post) {
        await comment.save();
        res.send('Success - comment saved');
      } else {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },
];
