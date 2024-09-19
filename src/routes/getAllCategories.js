const { Category } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/categories", auth, (req, res) => {
    Category.findAll()
      .then((categories) => {
        const message = `La liste complètes des categories a bien été reccupérée.`;

        res.json({ message, data: categories });
      })
      .catch((error) => {
        const message = `La liste complète des catégories n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
