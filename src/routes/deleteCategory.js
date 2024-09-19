const { Category } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/categories/:id", auth, (req, res) => {
    const id = req.params.id;
    Category.findByPk(id)
      .then((category) => {
        if (category === null) {
          const message = `La categorie n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return Category.destroy({ where: { id: id } }).then((_) => {
          const message = `La categorie ${category.name} a bien été supprimé.`;

          res.json({ message, data: category });
        });
      })
      .catch((error) => {
        const message = `La catégorie n'a pas pu être supprimée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
