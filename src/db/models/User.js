module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      emailAddress: {
        type: DataTypes.STRING,

        unique: {
          msg: "L'adresse email fournit est déjà utilisé.",
        },
        validate: {
          isEmail: {
            msg: "L'adresse email fournit n'est pas valide",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,

        unique: {
          msg: "Ce numéro de téléphone est déjà utilisé.",
        },
        is: {
          args: [/\d{3}-\d{3}-\d{4}/],
          msg: "Le numéro de téléphone n'est pas valide.",
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "Le nom d'utilisateur une propriété requise" },
          notNull: { msg: "Le nom d'utilisateur une propriété requise" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "Votre role dans l'entreprise est requise" },
          notNull: { msg: "Votre role dans l'entreprise est requise" },
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "Votre Nom est requis" },
          notNull: { msg: "Votre nom est requis" },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "Votre prénom est requis" },
          notNull: { msg: "Votre prénom est requis" },
        },
      },
      password: {
        type: DataTypes.STRING,

        validate: {
          is: {
            args: [
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            ],
            msg: "Le mot de passe doit être formé d'au moins 8 caractères, avoir au moins une lettre majuscule,au moins une lettre miniscule, au moins un caractère spécial et au moins un chiffre.",
          },
        },
      },
    },
    { timestamp: true }
  );
};
