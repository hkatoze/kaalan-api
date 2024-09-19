const { ValidationError } = require("sequelize");
const { Category } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/categories/", auth, (req, res) => {
    Category.create(req.body)
      .then((category) => {
        const message = `La catégorie ${category.name} a bien été crée.`;

        res.json({ message, data: category });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La catégorie n'a pas pu être ajoutée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
