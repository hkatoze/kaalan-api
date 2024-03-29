const { Sequelize, DataTypes } = require("sequelize");
const BookModel = require("./models/Book");
const SuggestionModel = require("./models/Suggestion");
const AuthorModel = require("./models/Author");
const CategorieModel = require("./models/Categorie");
const UserModel = require("./models/User");
const { books, authors, categories, users } = require("./testData");

const sequelize = new Sequelize(
  "u824779150_kaalan",
  "u824779150_harounakinda",
  "Kind@14042000",
  {
    host: "haalemtic.com",
    dialect: "mysql",
    dialectOptions: {},
    logging: false,
  }
);

const Book = BookModel(sequelize, DataTypes);
const Author = AuthorModel(sequelize, DataTypes);
const Category = CategorieModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Suggestion = SuggestionModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    console.log(`La base de données a bien été initialisée !`);
  });
};

module.exports = { initDb, Book, Author, Category, User, Suggestion };
