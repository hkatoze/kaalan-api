const bodyParser = require("body-parser");
const express = require("express");
const { initDb } = require("./src/db/sequelize");
const favicon = require("serve-favicon");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");
const firebase_service_account = "./src/auth/firebase_private_key.json";

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      fs.readFileSync(process.env.API_KEY || firebase_service_account, "utf8")
    )
  ),
});
const app = express();
const port = process.env.PORT || 3000;
app
  .use(bodyParser.json())
  .use(cors())
  .use(favicon(__dirname + "/favicon.ico"));
initDb();

/* ........All routes list........... */
require("./src/routes/home")(app);

/* ============ADMIN ROUTES============= */
require("./src/routes/uploadPdfOnFirebase")(app);
//Reset password
require("./src/routes/resetPassword")(app);

//Reset password code checking
require("./src/routes/resetPasswordCodeVerify")(app);
//Get user by id
require("./src/routes/getUserByPk")(app);
//Update user
require("./src/routes/updateUser")(app);
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
require("./src/routes/createBook")(app, admin);
//Update book
require("./src/routes/updateBook")(app);
//Delete book
require("./src/routes/deleteBook")(app);
//send suggestion
require("./src/routes/createSuggestion")(app);
//Get suggestion by ID
require("./src/routes/getSuggestionByPk")(app);
//Get all suggestions
require("./src/routes/getAllSuggestions")(app);
//Delete suggestion
require("./src/routes/deleteSuggestion")(app);
//Update suggestion
require("./src/routes/updateSuggestion")(app);

/* ============API AUTH ROUTES============= */
//signup to API
require("./src/routes/signupToApi")(app, admin);
//Login to API
require("./src/routes/loginToApi")(app);

//404 error managment
app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.`;
  // @ts-ignore
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Notre api a démaré sur : http://localhost:${port}`);
});

module.exports = app;
