var express = require('express');
var router = express.Router();

var ArticleController = require('../controllers/article.controller')

router.get('/', ArticleController.getAll);
router.post('/', ArticleController.create);

module.exports = router;