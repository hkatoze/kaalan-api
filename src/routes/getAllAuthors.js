const { Author, Book } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/authors", auth, (req, res) => {
    Author.findAll()
      .then((authors) => {
        const message = `La liste complète des auteurs avec leurs livres a bien été récupérée.`;

        const authorPromises = authors.map((author) => {
          return Book.findAll({ where: { author: author.name } });
        });

        Promise.all(authorPromises)
          .then((booksArray) => {
          
            const authorsWithBooks = authors.map((author, index) => {
              return {
                author: author,
                books: booksArray[index],
              };
            });

            res.json({ message, data: authorsWithBooks });
          })
          
      })
      .catch((error) => {
        const message = `La liste complète des auteurs n'a pas pu être récupérée. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
