const { Suggestion } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/suggestions", auth, (req, res) => {
    Suggestion.findAll()
      .then((suggestions) => {
        const message = `La liste complètes des suggestions a bien été reccupérée.`;

        res.json({ message, data: suggestions });
      })
      .catch((error) => {
        const message = `La liste complète des suggestions n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
