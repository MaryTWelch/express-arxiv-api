module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("Author", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Author;
  };