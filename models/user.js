const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});