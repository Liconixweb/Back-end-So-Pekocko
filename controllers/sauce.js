const Sauce = require('../models/sauce');
const fs = require('fs');
const { db } = require('../models/sauce');
const sauce = require('../models/sauce');

//Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes:0,
        dislikes:0,
    });
    sauce.save()
      .then(() => res.status(201).json({message : 'Sauce créée !'}))
      .catch((error) => res.status(400).json({ error }));
};

//Création d'un like ou un dislike sur une sauce
exports.createSauceLike = (req, res, next) => {            
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const like = {};      
            console.log(req.body.userId);
            console.log(sauce.usersLiked);
            console.log(sauce.usersDisliked);
            
            if (req.body.like === 1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    { message: 'La sauce est déjà aimé !'}
                } else {
                    like.$inc = { likes: 1 };
                    like.$addToSet = { usersLiked: req.body.userId };
                    console.log('like possible'); 
                }    
            console.log(like);            
            } else if (req.body.like === 0) {
                if (sauce.usersLiked.includes(req.body.userId)) { 
                    like.$inc = { likes: -1 };
                    like.$pull = { usersLiked: req.body.userId };
                } else {
                    like.$inc = { dislikes: -1 };
                    like.$pull = { usersDisliked: req.body.userId };    
                }       
                console.log('like ou dislike après like ou dislike');
            console.log(req.body.like);
            } else if (req.body.like === -1){
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    { message: 'La sauce est déjà pas aimé !'}
                } else {
                    like.$inc = { dislikes: 1 };
                    like.$pull = { usersLiked: req.body.userId };
                    like.$addToSet = { usersDisliked: req.body.userId };
                console.log('dislike possible'); 
                }
            console.log(like);
            }
            console.log('then marche');
            Sauce.updateOne(like)
                .then((sauce) => res.status(200).json(sauce))
                .catch((error) => res.status(400).json({ error }));
        }) 
        .catch((error) => res.status(404).json({ message: error }));   
};

//Modification d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Votre sauce a bien été modifié !' }))
        .catch((error) => res.status(400).json({ error }));
};

//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Votre sauce a bien été supprimée !' }))
                .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));    
};

//Consultation d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
};

//Consultation de toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))      
      .catch((error) => res.status(400).json({ message: "Problème d'affichage" }));
};