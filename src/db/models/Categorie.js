module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Categorie",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom de la catégorie est une propriété requise",
          },
          notNull: {
            msg: "Le nom de la catégorie est une propriété requise",
          },
        },
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'icon de la catégorie est une propriété requise",
          },
          notNull: {
            msg: "L'icon de la catégorie est une propriété requise",
          },
        },
      },
    },
    { timestamp: true, updatedAt: false }
  );
};
