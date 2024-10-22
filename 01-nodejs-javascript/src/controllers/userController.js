const { createUserService, loginService, getUserListService } = require("../services/userService");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const data = await createUserService(name, email, password);
  return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const data = await loginService(email, password);

  return res.status(200).json(data);
};

const getUserList = async (req, res) => {
  const data = await getUserListService();

  return res.status(200).json(data);
};

const getAccount = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  createUser, handleLogin, getUserList, getAccount
};
