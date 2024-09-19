const { Suggestion } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/suggestions/:id", auth, (req, res) => {
    const id = req.params.id;
    Suggestion.findByPk(id)
      .then((suggestion) => {
        if (suggestion === null) {
          const message = `La suggestion n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return Suggestion.destroy({ where: { id: id } }).then((_) => {
          const message = `La suggestion  a bien été supprimé.`;

          res.json({ message, data: suggestion });
        });
      })
      .catch((error) => {
        const message = `La suggestion n'a pas pu être supprimée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
