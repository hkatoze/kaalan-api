const { ValidationError } = require("sequelize");
const { Suggestion } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/suggestions/", auth, (req, res) => {
    Suggestion.create(req.body)
      .then((suggestion) => {
        const message = `La suggestion a bien été ajoutée.`;

        res.json({ message, data: suggestion });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
       
        const message = `La suggestion n'a pas pu être ajoutée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
