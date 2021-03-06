const dbConfig = require("../config/db.config.js");

const { Sequelize, QueryTypes} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  logging: true,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.QueryTypes = QueryTypes;

db.Articles = require("./article.model.js")(sequelize, Sequelize);
db.Authors = require("./author.model.js")(sequelize, Sequelize);

db.Articles.hasMany(db.Authors, { as: "Authors"});
db.Authors.belongsTo(db.Articles, {
    as: 'Article'
});

module.exports = db;