const express = require("express");
const Router = express.Router();
const accountController = require("../controllers/userAct");
const jwtRefresh = require("../controllers/userAct");
const verifyToken = require("../helpers/middleware");

Router.post("/Signup", accountController.userSignup);
Router.post("/Login", accountController.login);
Router.post("/Logout", verifyToken, accountController.userLogout);
Router.post("/ChangePassword", verifyToken, accountController.changePswd);
Router.get("/UpdateProfile", verifyToken, accountController.updateProfile);
Router.get("/UserLists", verifyToken, accountController.listUser);

// Refresh Token API
Router.post("/refreshToken", verifyToken, accountController.refreshToken);

module.exports = Router;
