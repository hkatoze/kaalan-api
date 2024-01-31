module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Suggestion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idOfuser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le id de l'utilisateur est une propriété requise" },
          notNull: { msg: "Le id de l'utilisateur est une propriété requise" },
        },
      },
      suggestion: {
        type: DataTypes.TEXT,
        allowNull: false,

        validate: {
          notEmpty: {
            msg: "La suggestion est une propriété requise",
          },
          notNull: {
            msg: "La suggestion est une propriété requise",
          },
        },
      },
    },
    { timestamp: true, updatedAt: false }
  );
};
