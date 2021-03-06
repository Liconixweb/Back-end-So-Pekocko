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

app.post('/api/auth/signup', (req, res, next) => {
  console.log(req.body);
  /*delete req.body._id;*/
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  console.log(user);
  user.save()
    .then(() => res.status(201).json({message: 'Utilisateur enregistré !'}))
    .catch((error) => res.status(400).json({message: "Une erreur est survenue !" }));
});

app.post('/api/auth/login', (req, res) => {
  console.log('login');
});
/*
app.post('/api/auth/sauces', (req, res, next) => {
  const sauce = new Sauce({
  ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({userId: String, token:String}))
    .catch((error) => res.status(400).json({ error}));
});

app.post('/api/auth/sauces/:id/like', (req, res, next) => {
  console.log(req, body);
});

app.put('/api/auth/sauces/:id', (req, res, next) => {
  console.log(req, body);
});

app.delete('/api/auth/sauces/:id', (req, res, next) => {
  console.log(req, body);
});

app.get('/api/auth/sauces', (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).jason({ error}));
});

app.get('/api/sauces/auth/:id', (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
});*/

module.exports = app;