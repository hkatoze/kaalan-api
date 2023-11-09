const { Category } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/categories/:id", auth, (req, res) => {
    const id = req.params.id;
    Category.update(req.body, { where: { id: id } })
      .then((_) => {
        Category.findByPk(id).then((category) => {
          if (category === null) {
            const message = `L'auteur demandé n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `La catégorie ${category.name} a bien été modifiée.`;
          res.json({ message, data: category });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La catégorie n'a pas pu être modifiée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
