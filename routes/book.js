const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');
const ratingCtrl = require('../controllers/rating');

router.get('/books/bestrating', ratingCtrl.getBestRating);
router.get('/books', bookCtrl.getAllBooks);
router.get('/books/:id', bookCtrl.getBook);
router.post('/books', auth, multer, bookCtrl.createBook);
router.post('/books/:id/rating', auth, ratingCtrl.postRating);
router.put('/books/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/books/:id', auth, bookCtrl.deleteBook);

module.exports = router;