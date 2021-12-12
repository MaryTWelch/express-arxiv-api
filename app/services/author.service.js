const db = require("../models");
const Author = db.Authors;
const sequelize = db.sequelize;

exports.createAuthor = async function (author, articleId) {

  return sequelize.transaction(function (t) {
    // chain all your queries here. make sure you return them.
    return Author.create({
      name: author.name,
      ArticleId: articleId
    }, {transaction: t}).then(function (author) {
      return author.dataValues;
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