/**
 * Article object from ARXIV
 * 
 * These columns will be generated automatically: id, arxiv_id, title, updated, published, createdAt, updatedAt.
 */
module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      arxiv_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      updated: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Article;
  };