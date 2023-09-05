const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const path = require('path');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');

const app = express();

dotenv.config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false
})

mongoose.connect(`${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_LINK}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(limiter);
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;