const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');

//router.get('/books/bestrating', bookCtrl.getBestRating);

router.get('/books', bookCtrl.getAllBooks);
router.get('/books/:id', bookCtrl.getBook);
router.post('/books', auth, multer, bookCtrl.createBook);
router.put('/books/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/books/:id', auth, bookCtrl.deleteBook);

module.exports = router;