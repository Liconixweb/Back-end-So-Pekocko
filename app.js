const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


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

app.post('http://localhost:3000/api/auth/signup', (req, res, next) => {
  console.log(req, body);
});

app.post('http://localhost:3000/api/auth/login', (req, res, next) => {
  console.log(req, body);
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
  console.log(req, body);
});

module.exports = app;