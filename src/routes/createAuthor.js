const { Author } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/authors/", auth, (req, res) => {
    Author.create(req.body)
      .then((author) => {
        const message = `L'auteur ${author.name} a bien été ajouté.`;
        res.json({ message, data: author });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'auteur n'a pas pu être ajouté. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
