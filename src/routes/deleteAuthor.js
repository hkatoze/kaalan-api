const { Author } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/authors/:id", auth, (req, res) => {
    const id = req.params.id;
    Author.findByPk(id)
      .then((author) => {
        if (author === null) {
          const message = `L'auteur  n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return Author.destroy({ where: { id: author.id } }).then((_) => {
          const message = `L'auteur ${author.name} a été supprimé avec succès.`;
          res.json({ message, data: author });
        });
      })
      .catch((error) => {
        const message = `L'auteur n'a pas pu être supprimé. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
