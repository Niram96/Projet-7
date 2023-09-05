const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// Signup / Login validation

const complexityOptions = {
    min: 5,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
};

const signUpAndLoginValidationObject = Joi.object({
    email: Joi.string()
    .email()
    .required(),
    password: passwordComplexity(complexityOptions)
})

function signUpAndLoginValidation (req, res, next) {
    const value = signUpAndLoginValidationObject.validate({
        email: req.body.email,
        password: req.body.password
    });
    if (value.error) {
       throw(value.error);
    };
    next();
}

// Book creation validation

const bookValidationObject = Joi.object({
    userId: Joi.string()
    .alphanum()
    .min(24)
    .max(24),
    title: Joi.string()
    .min(1)
    .max(100)
    .required(),
    author: Joi.string()
    .min(1)
    .max(100)
    .required(),
    year: Joi.number()
    .integer()
    .max(new Date().getFullYear())
    .required(),
    genre: Joi.string()
    .min(1)
    .max(100)
    .required(),
    userId: Joi.string()
    .alphanum()
    .min(24)
    .max(24),
    grade: Joi.number()
    .integer()
    .min(0)
    .max(5),
    averageRating: Joi.number()
    .integer()
    .min(0)
    .max(5)
});

function bookCreationValidation (req, res, next) {
    const bookObject = JSON.parse(req.body.book)
    const value = bookValidationObject.validate({
        userId: req.auth.userId,
        title: bookObject.title,
        author: bookObject.author,
        year: bookObject.year,
        genre: bookObject.genre,
        userId: bookObject.ratings.userId,
        grade: bookObject.ratings.grade,
        averageRating: bookObject.averageRating
    });
    if (value.error) {
        throw(value.error);
    };
    next();
}

const bookModificationObject = Joi.object({
    title: Joi.string()
    .min(1)
    .max(100),
    author: Joi.string()
    .min(1)
    .max(100),
    year: Joi.number()
    .integer()
    .max(new Date().getFullYear()),
    genre: Joi.string()
    .min(1)
    .max(100)
});

function bookModificationValidation (req, res, next) {
    const bookObject = req.body;
    const value = bookModificationObject.validate({
        title: bookObject.title,
        author: bookObject.author,
        year: bookObject.year,
        genre: bookObject.grade
    });
    if (value.error) {
        throw(value.error);
    };
    next();
}

// Exports

module.exports = {
    bookModificationValidation,
    signUpAndLoginValidation,
    bookCreationValidation
}
