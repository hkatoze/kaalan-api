const { Author, Book } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/authors/:id", auth, (req, res) => {
    const id = req.params.id;
    Author.findByPk(id)
      .then((author) => {
        if (author === null) {
          const message = `L'auteur demandé n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `L'auteur ${author.name} a bien été reccupéré.`;

        const authorName = author.name;

        Book.findAll({ where: { author: authorName } }).then((books) => {
          const message = `Il y'a au total ${books.length} livres de l'auteur ${author}`;
          res.json({ message, data: { author: author, books: books } });
        });
      })
      .catch((error) => {
        const message = `L'auteur n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
