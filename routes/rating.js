const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ratingCtrl = require('../controllers/rating');

router.post('/books/:id/rating', auth, ratingCtrl.postRating);

module.exports = router;