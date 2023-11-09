const { Author } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/kaalan/api/authors/:id", auth, (req, res) => {
    const id = req.params.id;
    Author.findByPk(id)
      .then((author) => {
        if (author === null) {
          const message = `L'auteur demandé n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `L'auteur ${author.name} a bien été reccupéré.`;

        res.json({ message, data: author });
      })
      .catch((error) => {
        const message = `L'auteur n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
