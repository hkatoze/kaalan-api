module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le titre du livre est une propriété requise" },
          notNull: { msg: "Le titre du livre est une propriété requise" },
        },
      },
      publicationDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La date de publication du livre est une propriété requise",
          },
          notNull: {
            msg: "La date de publication du livre est une propriété requise",
          },
        },
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le cover(photo) du livre est une propriété requise",
          },
          notNull: {
            msg: "Le cover(photo) du livre est une propriété requise",
          },
          isUrl: {
            msg: "Le cover(photo) du livre doit être une Url valide.",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La description du livre est une propriété requise",
          },
          notNull: {
            msg: "La description du livre est une propriété requise",
          },
        },
      },
      nbrPage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nombre de pages du livre est une propriété requise",
          },
          notNull: {
            msg: "Le nombre de pages du livre est une propriété requise",
          },
          isInt: {
            msg: "La valeur du nombre de page doit être un nombre entier.",
          },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'auteur du livre est une propriété requise",
          },
          notNull: {
            msg: "L'auteur du livre est une propriété requise",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La catégorie du livre est une propriété requise",
          },
          notNull: {
            msg: "La catégorie du livre est une propriété requise",
          },
        },
      },

      bookLink: {
        type: DataTypes.TEXT,
         
         
      },
    },
    { timestamp: true, updatedAt: false }
  );
};
