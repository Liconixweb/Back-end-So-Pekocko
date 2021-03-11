const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const helmet = require('helmet');
const mongoSanitize = require ('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

const app = express();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');



mongoose.connect('mongodb+srv://visitor:visitorOC06032021@cluster0.qfs5y.mongodb.net/SoPekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use (bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.disable('x-powered-by');

app.use(mongoSanitize( {
  replaceWith: '_'
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes, apiLimiter);
app.use('/api/sauces', sauceRoutes, apiLimiter);



module.exports = app;