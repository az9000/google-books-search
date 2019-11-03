const db = require("../models");
const axios = require("axios");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByName: function(req, res) {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.title)
      .then(function(response) {
        res.json(response.data.items);
      });
  },
  create: function(req, res) {

    let filter = {
      title: req.body.title,
      date: new Date(req.body.publishedDate)
    };
    let update = {};
    if (req.body.imageLinks) {
      update = {
        title: req.body.title,
        author: req.body.authors,
        synopsis: req.body.description,
        thumbnail: req.body.imageLinks.thumbnail,
        date: new Date(req.body.publishedDate),
        infoLink: req.body.infoLink
      };
    } else {
      update = {
        title: req.body.title,
        author: req.body.authors,
        synopsis: req.body.description,
        thumbnail: '',
        date: new Date(req.body.publishedDate),
        infoLink: req.body.infoLink
      };
    }

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    db.Book.findOneAndUpdate(filter, update, options, function(error, result) {
      if (error) return;

      res.json(result);
    });
  },
  update: function(req, res) {
    db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log('remove', req.params.id)
    db.Book.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
