const { Author } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/authors/:id", auth, (req, res) => {
    const id = req.params.id;

    Author.update(req.body, { where: { id: id } })
      .then((author) => {
        return Author.findByPk(id).then((author) => {
          if (author === null) {
            const message = `L'auteur demandé n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `L'auteur ${author.name} a bien été modifiée.`;

          res.json({ message, data: author });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'auteur n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
