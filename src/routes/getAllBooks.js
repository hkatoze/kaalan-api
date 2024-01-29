const { Book, User } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/books", auth, (req, res) => {
    if (req.query.category) {
      const category = req.query.category;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;

      return Book.findAndCountAll({
        where: { category: category },
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y'a au total ${count} livres de la catégorie ${category}`;
        res.json({ message, data: rows });
      });
    }
    if (req.query.author) {
      const author = req.query.author;

      return Book.findAll({ where: { author: author } }).then((books) => {
        const message = `Il y'a au total ${books.length} livres de l'auteur ${author}`;
        res.json({ message, data: books });
      });
    }

    if (req.query.search) {
      const searchQuery = req.query.search;

      return Book.findAll({
        where: {
          title: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((books) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${books.length} résultats`;
        res.json({ message, data: books });
      });
    }

    if (req.query.library) {
      const userId = req.query.library;

      return User.findByPk(userId).then((user) => {
        const libraryBooksId = user["libraryBooks"].split(";").filter(Boolean);
        let libraryBooks = [];

        // Utiliser Promise.all pour attendre que toutes les promesses soient résolues
        const bookPromises = libraryBooksId.map((bookId) => {
          return Book.findByPk(Number(bookId)).then((book) => {
            if (book === null) {
              const message = `Le livre demandé n'existe pas. Réessayer avec un autre identifiant.`;
              return res.status(404).json({ message });
            }
            libraryBooks = [...libraryBooks, book];
          });
        });

        // Utiliser Promise.all pour attendre que toutes les promesses soient résolues
        return Promise.all(bookPromises).then(() => {
          const message = `La librairie complète de l'utilisateur a bien été récupérée.`;
          res.json({ message, data: libraryBooks });
        });
      });
    }

    Book.findAll()
      .then((books) => {
        const message = `La liste complète des livres a bien été reccupérée.`;

        res.json({ message, data: books });
      })
      .catch((error) => {
        const message = `La liste complète des livres n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
