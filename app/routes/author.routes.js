var express = require('express');
var router = express.Router();

var AuthorController = require('../controllers/author.controller');

//router.get('/', AuthorController.getAll);
router.post('/', AuthorController.create);

module.exports = router;