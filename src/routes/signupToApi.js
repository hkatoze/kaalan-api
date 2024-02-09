const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const { User } = require("../db/sequelize");

module.exports = (app, firebase) => {
  app.post("/api/signupToApi", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Créer l'utilisateur dans la base de données Sequelize
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
      const existingUser = await firebase
        .auth()
        .getUserByEmail(req.body.emailAddress);

      if (!existingUser) {
        const firebaseUser = await firebase.auth().createUser({
          email: req.body.emailAddress,
          password: req.body.password,
        });
      }

      const message = `Compte crée avec succès!`;
      res.json({ message, data: user });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message });
      }
      const errorMessage = `L'utilisateur n'a pas pu être créé. Réessayer dans quelques instants.`;
      res.status(500).json({ message: errorMessage, data: error });
    }
  });
};
