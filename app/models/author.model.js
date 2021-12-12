module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("Author", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
      // ,
      // articleId: {
      //   type: DataTypes.STRING
      // }
    });
  
    return Author;
  };