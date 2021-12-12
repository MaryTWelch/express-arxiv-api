const db = require("../models");
const Article = db.Articles;
const Author = db.Authors;
const Op = db.Sequelize.Op;
var ArticleService = require('../services/article.service');

exports.create = async function (req, res, next) {
    // Create an Article
    const article = {
      arxiv_id: req.body.arxiv_id,
      title: req.body.title,
      updated: req.body.updated,
      published: req.body.published
    };

    // Save Article in the database
    Article.create(article)
    .then(data => {
      return res.status(200).json({ status: 200, data: data, message: "Article created successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });

}

// Get all Articles include Authors
exports.getAll = async function (req, res, next) {
  try {
    const articles = await Article.findAll({
      include: [{ model: Author, as: 'Authors' }]
    })

    return res.status(200).json({ status: 200, articles: articles, message: "Successfully Retrieved Articles" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}