const { Suggestion } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/suggestions/:id", auth, (req, res) => {
    const id = req.params.id;
    Suggestion.update(req.body, { where: { id: id } })
      .then((_) => {
        Suggestion.findByPk(id).then((suggestion) => {
          if (suggestion === null) {
            const message = `La suggestion demandée n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `La suggestion a bien été modifiée.`;
          res.json({ message, data: suggestion });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La suggestion n'a pas pu être modifiée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
