const { ValidationError } = require("sequelize");
const { Book } = require("../db/sequelize");
const auth = require("../auth/auth");
const getAllUsersFcmToken = require("../utilsFunctions/getAllUsersFcmToken");
const sendPushNotification = require("../utilsFunctions/sendNotification");

module.exports = (app, firebase) => {
  app.post("/api/books/", auth, async (req, res) => {
    try {
      const book = await Book.create(req.body);

      // Récupérer le titre du livre pour la notification
      const bookTitle = book.title;

      // Récupérer tous les tokens FCM des utilisateurs
      const users = await getAllUsersFcmToken();
      const registrationTokens = users
        .map((user) => user.fcmToken)
        .filter(Boolean);

      // Envoyer une notification push à tous les utilisateurs
      if (registrationTokens.length > 0) {
        const notificationTitle = "Nouveau livre ajouté!";
        const notificationBody = `${bookTitle}`;

        await sendPushNotification(
          firebase,
          registrationTokens,
          notificationTitle,
          notificationBody
        );
      }

      const message = `Le livre ${bookTitle} a bien été ajouté.`;
      res.json({ message, data: book });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      }

      const errorMessage = `Le livre n'a pas pu être ajouté. Réessayez dans quelques instants.`;
      res.status(500).json({ message: errorMessage, data: error });
    }
  });
};
