const express = require('express');
const router = express.Router();
const posts_controller = require('../controllers/posts_controller');
const passport = require('passport');

// All posts as JSON on GET
router.get('/all', posts_controller.posts_all_summary);

// 10 Most Recent Posts on GET
router.get('/recent', posts_controller.get_recent)

// Individual post as JSON on GET
router.get('/:postId', posts_controller.get_post);

// All comments for post as JSON on GET
router.get('/:postId/comments', posts_controller.get_comments);

// Create comment for blog post on POST
router.post('/:postId/comments/create', posts_controller.create_comment);

// Create blog post on POST after JWT verification
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  posts_controller.post_create_post
);

// Delete blog post on POST
router.post(
  '/:postId/delete',
  passport.authenticate('jwt', { session: false }),
  posts_controller.post_delete
);

// Update a blog post on PUT
router.put('/:postId', posts_controller.post_update);

module.exports = router;
