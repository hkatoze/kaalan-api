const { User } = require("../db/sequelize");

const getAllUsersFcmToken = async () => {
  const users = await User.findAll();

  return users;
};
