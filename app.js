const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Sauce = require('./models/sauce');
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb+srv://user:userOC06032021@cluster0.qfs5y.mongodb.net/SoPekocko?retryWrites=true&w=majority',
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

app.use(bodyParser.json());

app.post('/api/signup', (req, res, next) => {
  /*delete req.body._id;*/
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save()
    .then(() => res.status(201).json({message: 'Utilisateur enregistré !'}))
    .catch((error) => res.status(400).json({ error }));
});
/*app.post('http://localhost:3000/api/login', (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  
  user.save()
    .then(() => res.status(201).json({userId: String, token:String}))
    .catch((error) => res.status(400).json({ error}));
});

app.post('http://localhost:3000/api/sauces', (req, res, next) => {
  console.log(req, body);
});

app.post('http://localhost:3000/api/sauces/:id/like', (req, res, next) => {
  console.log(req, body);
});

app.put('http://localhost:3000/api/sauces/:id', (req, res, next) => {
  console.log(req, body);
});

app.delete('http://localhost:3000/api/sauces/:id', (req, res, next) => {
  console.log(req, body);
});

app.get('http://localhost:3000/api/sauces', (req, res, next) => {
  console.log(req, body);
});

app.get('http://localhost:3000/api/sauces/:id', (req, res, next) => {
  
  
});*/

module.exports = app;