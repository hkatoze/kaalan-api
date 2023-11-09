const validRoles = ["USER", "ADMIN"];

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
        allowNull: false,
        unique: {
          msg: "L'adresse email fournit est déjà utilisé.",
        },
        validate: {
          isEmail: {
            msg: "L'adresse email fournit n'est pas valide",
          },
          notEmpty: { msg: "L'adresse email est requise" },
          notNull: { msg: "L'adresse email est requise" },
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: "Le nom d'utilisateur fournit est déjà utilisé.",
        },
        validate: {
          isAlphanumeric: {
            msg: "Le nom d'utilisateur doit être à caractère Alphanumérique (ex: karim_sanogo).",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isRoleValid(value) {
            if (!validRoles.includes(value)) {
              throw new Error(
                `Le role de l'utilisateur doit appartenir à la liste suivante [${validRoles}]`
              );
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: [
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            ],
            msg: "Le mot de passe doit être formé d'au moins 8 caractères, avoir au moins une lettre majuscule,au moins une lettre miniscule, au moins un caractère spécial et au moins un chiffre.",
          },
          notEmpty: { msg: "Le mot de passe est requis." },
          notNull: { msg: "Le mot de passe est requis." },
        },
      },
    },
    { timestamp: true }
  );
};
