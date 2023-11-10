const { Sequelize, DataTypes } = require("sequelize");
const BookModel = require("./models/Book");
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

const initDb = () => {
  return sequelize.sync().then((_) => {
    /*   books.map((book) => {
      Book.create(book).then((book) => {});
    });
    authors.map((author) => {
      Author.create(author).then((author) => {});
    });
    categories.map((category) => {
      Category.create(category).then((category) => {});
    });
    users.map((user) => {
      User.create(user).then((user) => {});
    }); */
    console.log(`La base de données a bien été initialisée !`);
  });
};

module.exports = { initDb, Book, Author, Category, User };
