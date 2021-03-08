const Sauce = require('../models/sauce');
const fs = require('fs');
const { db } = require('../models/sauce');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({message : 'Sauce créée !'}))
      .catch((error) => res.status(400).json({ error }));
};

exports.createSauceLike = (req, res, next) => {
    const id = req.body.userId;
    db.sauces.update(
        { userId: id, like: 1 });
    lastError = db.getLastError();
    if (lastError){
        db.sauces.update({userId: id}, {$inc: {likes: 1}})
    }    
    Sauce.findOne({ userId })
        .then(() => res.status(201).json({message : 'Sauce likée !'}))
        .catch((error) => res.status(400).json({ error }));
};

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

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))      
      .catch((error) => res.status(400).json({ message: "Problème d'affichage" }));
};