const { Category } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/categories/:id", auth, (req, res) => {
    const id = req.params.id;
    Category.findByPk(id)
      .then((category) => {
        if (category === null) {
          const message = `La categorie demandée n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `La categorie ${category.name} a bien été reccupérée.`;

        res.json({ message, data: category });
      })
      .catch((error) => {
        const message = `La categorie n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
