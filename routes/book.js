const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const bookCtrl = require('../controllers/book');
const ratingCtrl = require('../controllers/rating');
const sharp = require('../middlewares/sharp');
const bookCreationValidation = require('../middlewares/joi').bookCreationValidation;
const bookModificationValidation = require('../middlewares/joi').bookModificationValidation;

router.get('/bestrating', ratingCtrl.getBestRating);
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBook);
router.post('/', auth, multer, bookCreationValidation, sharp, bookCtrl.createBook);
router.post('/:id/rating', auth, ratingCtrl.postRating);
router.put('/:id', auth, multer, bookModificationValidation, sharp, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;