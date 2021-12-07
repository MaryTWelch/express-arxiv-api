module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("author", {
      name: {
        type: DataTypes.STRING
      }
    });
  
    return Author;
  };