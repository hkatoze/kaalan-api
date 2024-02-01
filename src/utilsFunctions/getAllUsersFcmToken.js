const { User } = require("../db/sequelize");

const getAllUsersFcmToken = async () => {
  try {
    const users = await User.findAll({
      attributes: ["fcmToken"],
    });

    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};
