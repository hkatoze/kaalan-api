const bcrypt = require("bcrypt");
const { User } = require("../db/sequelize");

const {
  generateVerificationCode,
} = require("../utilsFunctions/generateVerificationCode");
const {
  sendVerificationCode,
} = require("../utilsFunctions/sendVerificationCode");

module.exports = (app) => {
  // Endpoint pour la demande de réinitialisation du mot de passe
  app.post("/api/reset-password", async (req, res) => {
    const { emailAddress } = req.body;

    try {
      // Vérification si l'utilisateur existe
      const user = await User.findOne({ where: { emailAddress } });
      if (!user) {
        return res.status(404).json({
          message: "Cette adresse mail ne dispose pas compte.",
        });
      }

      // Génération d'un code de vérification unique
      const verificationCode = generateVerificationCode();

      // Stockage du code de vérification dans la base de données
      user.resetPasswordCode = verificationCode;
      await user.save();

      // Envoi du code de vérification par e-mail
      await sendVerificationCode(emailAddress, verificationCode);

      return res.status(200).json({
        message: "Un code de vérification a été envoyé à votre adresse e-mail.",
        verificationCode: verificationCode,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la réinitialisation du mot de passe.",
        error,
      });
    }
  });
};
