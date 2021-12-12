var express = require('express');
var router = express.Router();

var ArxivController = require('../controllers/arxiv.controller');

router.post('/sync', ArxivController.syncAllData);

module.exports = router;