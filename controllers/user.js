const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    };

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
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
                            'Li-@-7n+mi/[MYb9,yp+YE4K4EMhD!92xW-+@BpSG;M+=-cNB,W:&6u+8!Pu]bD=[Qz7FNY;$_HzZSd#}@TF*]Pe:XwKZ%e)Xc[pDTdMWiVgS)]fRzSK9;F#i{(:ZWm:]&$?VQme@jzkaZ7e7VZK;MaUZSUgN6rUT;]!ZJViMNW;h{-$P&bQ{c].9tk:Aa:i57$@@#_uBXR)fyr(E4#c%[{i}rp2Yz#cG$9bm;WJzfaPK_.U8V]b!A/%E{CqqRH-xhg{=b.=:bJ]}9U$]B%C{xwQUgeKK%b+&664Vihn+C4+',
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};