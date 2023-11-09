const { Book } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/books/:id", auth, (req, res) => {
    const id = req.params.id;

    Book.findByPk(id)
      .then((book) => {
        if (book === null) {
          const message = `Le livre n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return Book.destroy({ where: { id: id } }).then((_) => {
          const message = `Le livre ${book.name} a bien été supprimé.`;
          res.json({ message, data: book });
        });
      })
      .catch((error) => {
        const message = `Le livre n'a pas pu être supprimé. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
