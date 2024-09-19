const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const { User } = require("../db/sequelize");

module.exports = (app, firebase) => {
  app.post("/api/signupToApi", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    User.create({
      emailAddress: req.body.emailAddress,
      phone: req.body.phone,
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      libraryBooks: "",
      fcmToken: "",
    })
      .then((user) => {
        const message = `Compte crée avec succès!`;
        // Créer l'utilisateur dans Firebase Auth
        const existingUser = firebase
          .auth()
          .getUserByEmail(req.body.emailAddress);

        if (!existingUser) {
          const firebaseUser = firebase.auth().createUser({
            email: req.body.emailAddress,
            password: req.body.password,
          });
        }

        res.json({ message, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message });
        }

        console.log(error);
        const message = `Erreur de création du compte. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
