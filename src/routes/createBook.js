const { ValidationError } = require("sequelize");
const { Book, User } = require("../db/sequelize");
const auth = require("../auth/auth");

 

module.exports = (app, firebase) => {
  app.post("/api/books/", auth, (req, res) => {
    Book.create(req.body)
      .then((book) => {
        const message = `Le livre ${book.title} a bien été ajouté.`;

        const bookTitle = book.title;

        User.findAll()
          .then((users) => {
            const registrationTokens = users
              .map((token) => token.fcmToken)
              .filter(Boolean);

            // Envoyer une notification push à tous les utilisateurs
            if (registrationTokens.length > 0) {
              const notibody = {
                notification: {
                  title: "Nouveau livre ajouté!",
                  body: `${book.title}`,
                  icon: "https://ucarecdn.com/c398df23-409d-4fd6-97b7-537c893bd8d4/-/preview/500x500/-/quality/smart/-/format/auto/",
                  image: `${book.cover}`
                },
                tokens: registrationTokens,
              };

              firebase
                .messaging()
                .sendMulticast(notibody)
                .then((response) => {
                  console.log(
                    response.successCount +
                      " notifications enyoyées avec succès."
                  );
                })
                .catch((error) => {
                  res.status(500).json({ error: error });
                });
            }

            res.json({ message, data: book });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le livre n'a pas pu être ajouté. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
