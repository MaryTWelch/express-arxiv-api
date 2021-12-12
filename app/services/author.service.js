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

  // try {
  //   debugger;
  //   const author = await Author.create({ name: author.name });  //, articleId: articleId
  //   return author;
  // } catch (e) {
  //     console.error('Author create error: ' + e);
  // }

  // const article = await 

  // const result = await Author.addArticle()


    // return sequelize.transaction(function (t) {
    //   // chain all your queries here. make sure you return them.
    //   debugger;
    //   return Author.create({
    //     name: author.name
    //     //,
    //     //ArticleId: articleId
    //   }
      
    //   // , {
    //   //   include: [{

    //   //   }]
    //   // }
      
    //   , {transaction: t}).then(function (author) {
    //     return author.dataValues;
    //   });
    
    // }).then(function (result) {
    //   return result;
    //   // Transaction has been committed
    //   // result is whatever the result of the promise chain returned to the transaction callback
    // }).catch(function (err) {
    //   console.log("Error while creating author: ", err);
    //   throw new Error('Error: ' + err);
    //   // Transaction has been rolled back
    //   // err is whatever rejected the promise chain returned to the transaction callback
    // });
  
};