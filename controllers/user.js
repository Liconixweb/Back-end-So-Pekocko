const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoJS = require ('crypto-js');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const cipherText = cryptoJS.HmacSHA512(req.body.email, 'secret_key').toString();
            const user = new User({
                email: cipherText,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    };    

exports.login = (req, res, next) => {
    const cipherText = cryptoJS.HmacSHA512(req.body.email, 'secret_key').toString();
    User.findOne({ email: cipherText })
        .then((user) => {            
            if(!user) {
                return res.status(401).json({ error : 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error : 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id},
                            process.env.TOKEN,
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));            
        }) 
        .catch((error) => res.status(500).json({ error }));
};