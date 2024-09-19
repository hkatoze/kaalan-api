const { User } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/users/:userId", auth, (req, res) => {
    const id = req.params.userId;

    User.findByPk(id)
      .then((user) => {
        if (user === null) {
          const message = `L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }

        if (req.body.libraryBooks) {
          if (req.query.action === "delete") {
            const libraryBooksId = user.libraryBooks.split(",").filter(Boolean);
            const newLibraryBooksId = libraryBooksId.filter(
              (element) => element !== req.body.libraryBooks
            );

            const newLibraryBooksIdString = newLibraryBooksId.map(
              (bookId) => `${bookId}`
            );

            User.update(
              { libraryBooks: `${newLibraryBooksIdString},` },
              { where: { id: id } }
            ).then((_) => {
              return User.findByPk(id).then((updateUser) => {
                if (updateUser === null) {
                  const message = `L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.`;

                  return res.status(404).json({ message });
                }
                const message = `Livre retiré de votre bibliothèque.`;
                res.json({ message, data: updateUser });
              });
            });
          } else {
            User.update(
              { libraryBooks: `${user.libraryBooks}${req.body.libraryBooks},` },
              { where: { id: id } }
            ).then((_) => {
              return User.findByPk(id).then((updateUser) => {
                if (updateUser === null) {
                  const message = `L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.`;

                  return res.status(404).json({ message });
                }
                const message = `Livre ajouté à votre bibliothèque.`;
                res.json({ message, data: updateUser });
              });
            });
          }
        } else {
          User.update(req.body, { where: { id: id } }).then((_) => {
            return User.findByPk(id).then((user) => {
              if (user === null) {
                const message = `L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.`;

                return res.status(404).json({ message });
              }
              const message = `L'utilisateur ${
                user.firstname + " " + user.lastname
              } a bien été modifié.`;
              res.json({ message, data: user });
            });
          });
        }
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'utilisateur n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
