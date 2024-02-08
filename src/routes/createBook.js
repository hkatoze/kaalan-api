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
                },
                android: {
                  notification: {
                    imageUrl: `${book.cover}`,
                  },
                },
                apns: {
                  payload: {
                    aps: {
                      "mutable-content": 1,
                    },
                  },
                  fcm_options: {
                    image: `${book.cover}`,
                  },
                },
                webpush: {
                  headers: {
                    image: `${book.cover}`,
                  },
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
