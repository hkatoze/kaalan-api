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
        
      },
      lastname: {
        type: DataTypes.STRING,
         
      },
      password: {
        type: DataTypes.STRING,

         
      },
      fcmToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      libraryBooks: {
        type: DataTypes.STRING,
      },
    },
    { timestamp: true }
  );
};
