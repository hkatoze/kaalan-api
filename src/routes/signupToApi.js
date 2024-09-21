const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const { User } = require("../db/sequelize");

module.exports = (app, firebase) => {
  app.post("/api/signupToApi", async (req, res) => {
    try {
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Créer l'utilisateur dans ta base de données locale (Sequelize)
      const user = await User.create({
        emailAddress: req.body.emailAddress,
        phone: req.body.phone,
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        libraryBooks: "",
        fcmToken: "",
      });

      // Créer l'utilisateur dans Firebase Auth
      await firebase.auth().createUser({
        email: req.body.emailAddress,
        password: req.body.password,
      });

      const message = `Compte créé avec succès!`;
      res.json({ message, data: user });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message });
      }

      // Gérer les erreurs spécifiques de Firebase
      if (error.code === "auth/email-already-exists") {
        return res
          .status(400)
          .json({ message: "L'email existe déjà dans Firebase Auth." });
      }

      console.error("Erreur lors de la création du compte:", error);
      const message = `Erreur de création du compte. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    }
  });
};
