var express = require('express');
var router = express.Router();

var ArticleController = require('../controllers/article.controller');

router.get('/getAll', ArticleController.getAll);
//Commenting out route so that data is only created directly from the arxiv API
//router.post('/', ArticleController.create);

module.exports = router;