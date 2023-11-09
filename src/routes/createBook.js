const { ValidationError } = require("sequelize");
const { Book } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/books/", auth, (req, res) => {
    Book.create(req.body)
      .then((book) => {
        const message = `Le livre ${book.title} a bien été ajouté.`;

        res.json({ message, data: book });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le livre n'a pas pu être ajouté. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
