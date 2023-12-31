const Book = require('../models/Book');

function averageCalcul(book) {
    let rateNb = book.ratings.length;
    let average = 0;
    let ratingSum = 0;
    for (let i=0; i < book.ratings.length; i++) {
        const rate = book.ratings[i].grade;
        ratingSum += rate;
    }    
    average = ratingSum / rateNb;
    return (book.averageRating = average.toFixed(1));
}

exports.postRating = (req, res, next) => {
    let isIdAlreadyExist = false;
    Book.findOne({_id: req.params.id})
    .then((book) => {
        for (let i=0; i < book.ratings.length; i++) {
            const id = book.ratings[i].userId;
            id === req.auth.userId && (isIdAlreadyExist = true);
        }
        if (!isIdAlreadyExist) {
            const newRating = req.body;
            if (newRating.rating) {
                newRating['grade'] = newRating['rating'];
                delete newRating.rating;
            }
            book.ratings.push(newRating);
            averageCalcul(book);
            book.save();
            res.status(201).send(book);
        }
        else {
            res.status(401).send({ message: 'Un avis par personne'})
        }
    })
    .catch(error => {
        res.status(404).json({ error })
    });
};
        
exports.getBestRating = (req, res, next) => {
    Book.find()
    .then(books => {
        books.sort((a, b) => {
            return b.averageRating - a.averageRating;
        });
        books.splice(3, books.length -3);
        res.status(201).json(books);
    })
    .catch(error => {res.status(404).json({ error })});
};