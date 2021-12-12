const db = require("../models");
const Article = db.Articles;
const Author = db.authors;
var AuthorService = require('../services/author.service');

// Create and save new Authors
exports.create = async function (req, res, next) {
    const author = req.body.author;
    const articleId = req.body.articleId;
    return AuthorService.createAuthor(author, articleId)
        .then((author) => {
            return res.status(200).json({ status: 200, message: "Successfully Created Author", author: author});;
        })
        .catch((err) => {
            console.log(">> Error while creating author: ", err);
            return res.status(500).json({ status: 500, message: err.message });
        });

}

// Get the authors for a given Article
exports.findAuthorsByArticleId = (articleId) => {
    return Article.findByPk(articleId, { include: ["authors"]})
        .then((article) => {
            return article;
        })
        .catch((err) => {
            console.log("Error while finding article: ", err);
        })
}