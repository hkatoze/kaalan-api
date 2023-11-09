module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("<center>Api Kaalan déployé avec succès😊</center>");
  });
};
