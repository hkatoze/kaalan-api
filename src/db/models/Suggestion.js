module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Suggestion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le id de l'utilisateur est une propriété requise" },
          notNull: { msg: "Le id de l'utilisateur est une propriété requise" },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,

        validate: {
          notEmpty: {
            msg: "Le message est une propriété requise",
          },
          notNull: {
            msg: "Le message est une propriété requise",
          },
        },
      },
    },
    { timestamp: true, updatedAt: false }
  );
};
