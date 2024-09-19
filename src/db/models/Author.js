module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Author",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: `L'auteur existe déjà.` },
        validate: {
          notEmpty: { msg: "Le nom de l'auteur est une propriété requise" },
          notNull: { msg: "Le nom de l'auteur est une propriété requise" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,

        validate: {
          notEmpty: { msg: "La description de l'auteur est une propriété requise" },
          notNull: { msg: "La description de l'auteur est une propriété requise" },
        },
      },
      profilImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La photo de l'auteur est une propriété requise" },
          notNull: { msg: "La photo de l'auteur est une propriété requise" },
        },
      },
    },
    { timestamp: true, updatedAt: false }
  );
};
