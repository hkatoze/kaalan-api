const { Author } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/authors", auth, (req, res) => {
    const id = req.params.id;

    Author.findAll()
      .then((authors) => {
        const message = `La liste complète des auteurs a bien été reccupérée.`;

        res.json({ message, data: authors });
      })
      .catch((error) => {
        const message = `La liste complète des auteurs n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
