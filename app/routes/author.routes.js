var express = require('express');
var router = express.Router();

var AuthorController = require('../controllers/author.controller');

//Commenting out routes so that data is only created directly from the arxiv API
//router.get('/', AuthorController.getAll);
//router.post('/', AuthorController.create);

module.exports = router;