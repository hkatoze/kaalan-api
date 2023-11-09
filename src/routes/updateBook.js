const { Book } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/books/:id", auth, (req, res) => {
    const id = req.params.id;

    Book.update(req.body, { where: { id: id } })
      .then((_) => {
        return Book.findByPk(id).then((book) => {
          if (book === null) {
            const message = `Le livre demandé n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `Le livre ${book.title} a bien été modifié.`;
          res.json({ message, data: book });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le livre  n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
