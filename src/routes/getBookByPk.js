const { Book } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/books/:id", auth, (req, res) => {
    const id = req.params.id;

    Book.findByPk(id)
      .then((book) => {
        if (book === null) {
          const message = `Le livre  demandé n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `Le livre N ${book.id} a bien été reccupéré.`;

        res.json({ message, data: book });
      })
      .catch((error) => {
        const message = `Le livre n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
