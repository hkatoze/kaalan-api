const bodyParser = require("body-parser");
const express = require("express");
const { initDb } = require("./src/db/sequelize");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json()).use(cors());
initDb();

/* ........All routes list........... */
require("./src/routes/home")(app);
//Fetch all authors
require("./src/routes/getAllAuthors")(app);
//Get author by id
require("./src/routes/getAuthorByPk")(app);
//Create author
require("./src/routes/createAuthor")(app);
//Delete author
require("./src/routes/deleteAuthor")(app);
//Update author
require("./src/routes/updateAuthor")(app);
//Fetch all Categories
require("./src/routes/getAllCategories")(app);
//Fetch category by id
require("./src/routes/getCategoryByPk")(app);
//Create category
require("./src/routes/createCategory")(app);
//Delete category
require("./src/routes/deleteCategory")(app);
//Update category
require("./src/routes/updateCategory")(app);
//Fetch All books
require("./src/routes/getAllBooks")(app);
//Get a book by ID
require("./src/routes/getBookByPk")(app);
//Create book
require("./src/routes/createBook")(app);
//Update book
require("./src/routes/updateBook")(app);
//Delete book
require("./src/routes/deleteBook")(app);
//signup
require("./src/routes/signup")(app);
//Login
require("./src/routes/login")(app);

//404 error managment
app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Notre api a démaré sur : http://localhost:${port}`);
});

module.exports = app;
