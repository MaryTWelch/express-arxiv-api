const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

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
      return res.status(200).json({ status: 200, data: article, message: "Article created successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });

}

exports.getAll = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
      var users = await UserService.getUsers({}, page, limit)
      return res.status(200).json({ status: 200, data: users, message: "Succesfully Retrieved Articles" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}

/*
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // arxiv_id: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    //   },
    //   title: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    //   },
    //   updated: {
    //     type: Sequelize.STRING
    //   },
    //   published: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: false
    //   }
  
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
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Article."
        });
      });

    res.send('article created');
  };

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  debugger;
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Article.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving articles."
        });
      });
    
      res.send('articles found');
};

exports.deleteAll = (req, res) => {
    Article.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Articles were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all articles."
        });
      });
  };*/