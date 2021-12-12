const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = async function (article) {

  return sequelize.transaction(function (t) {

    // chain all your queries here. make sure you return them.
    return Article.create({
      arxiv_id: article.id,
      title: article.title,
      updated: article.updated,
      published: article.published
    }, {transaction: t}).then(function (article) {
      return article.dataValues;
    });
  
  }).then(function (result) {
    return result;
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
  }).catch(function (err) {
    throw new Error('Error: ' + err);
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
  });

};

exports.getAll = () => {
  return Article.findAll(
    //{
    //include: ["authors"]
  //}
  ).then((articles) => {
    return articles;
  }).catch(err => {
    console.error(err);
  });
};



