const db = require("../models");
const Article = db.Articles;
const Author = db.Authors;
const queryTypes = db.QueryTypes;
//const {in: opIn} = db.Sequelize.Op;
//var ArticleService = require('../services/article.service');

//const { QueryTypes } = require('sequelize');

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

// Search articles by Author string
exports.searchByAuthor = async function (req, res, next) {
  try {
    debugger;

    //const articles = await db.sequelize.query("SELECT * FROM \"Articles\"",{ type: queryTypes.SELECT });

    const authorQuery1 = 'SELECT * FROM "Authors"';

    const authorQuery2 = 'SELECT * FROM "Authors" WHERE name = "' + req.body.name + '"';

    const authorQuery3 = 'SELECT * FROM "Authors" A WHERE A.Name = "Milena Cukic Radenkovic"'; //"' + req.body.name + '"

    const authorQuery4 = "
    Select * from \"Authors\" A
    where trim(A.name) = 'Andreas Maier'
    order by name
    ";

    const authorsWithSameName = await db.sequelize.query(authorQuery4,{ type: queryTypes.SELECT });

    //db.Sequelize.Query("SELECT * FROM `articles`",
     // db.sequelize.query("SELECT * FROM `articles`",{ type: queryTypes.SELECT });
    // const author = await Author.findAll({
    //   where: {
    //     name: req.body.name
    //   }
    // })

    // const articles = await Article.findAll({
    //   where: {
    //     author: {
    //       name: {
    //         [opIn]: req.body.name
    //       }
    //     }
    //   }
    // });

      //include: [{ model: Author, as: 'Authors' }]
    //})

    return res.status(200).json({ status: 200, articles: articles, message: "Successfully Retrieved Articles by Author name" });
  } catch (e) {
      console.log(e);
      return res.status(400).json({ status: 400, message: e.message });
  }
}