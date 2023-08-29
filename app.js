const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://Niram96:E95fPhCNRNdgH9eT@cluster-projet-7-opencl.ldhe6b5.mongodb.net/?retryWrites=true&w=majority',
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

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api', bookRoutes);

module.exports = app;