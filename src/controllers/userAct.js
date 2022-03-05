const joi = require("joi");
const { createAccount } = require("../validators/userValidator");
const userModel = require("../models/userModel");
const { createToken } = require("../settings/jwt");
const bcrypt = require("bcryptjs");

// User Signup API
const userSignup = async (req, res) => {
  try {
    console.log("UserSignUp------------------->");
    const userForm = await createAccount.validateAsync(req.body);
    const validateEmail = await userModel.findOne({ email: userForm.email });

    if (validateEmail) {
      throw Error("Account already exist with this email.");
    } else {
      const user = await new userModel(req.body).save();
      const token1 = await createToken(user, "30d");
      const token2 = await createToken(user, "60d");

      const UpdateUser = await userModel.findOneAndUpdate(
        { _id: user._id },
        { accessToken: token1, refreshToken: token2 },
        { new: true }
      );
      res.status(200).send({ data: UpdateUser });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User login controll

const login = async (req, res) => {
  try {
    const userLogin = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(" User Data", userLogin);
    const token1 = await createToken(userLogin, "30d");
    const token2 = await createToken(userLogin, "60d");

    const UpdateUser = await userModel.findOneAndUpdate(
      { _id: userLogin._id },
      { accessToken: token1, refreshToken: token2 },
      { new: true }
    );

    res.status(200).send(UpdateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// controller for the user logout

const userLogout = async (req, res) => {
  try {
    const id = req.user._id;
    const token = await userModel.findById(id);

    const logout = await userModel.findByIdAndUpdate(id, { token: " " });
    res.status(200).json({ message: "Logout Successfully !" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// controller to change the password of the user
const changePswd = async (req, res) => {
  try {
    const id = req.user._id;

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const user = await userModel.findById(id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw Error("Old password is Wrong !");
    } else {
      let bcryptPassword = await bcrypt.hash(newPassword, 8);
      const updatePassword = await userModel.findByIdAndUpdate(id, {
        password: bcryptPassword,
      });
      return res.status(200).send({ message: "Password Updated " });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// controller for the update profile
const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    // console.log('The id is => ',id)
    const user = await userModel.findById(id);
    console.log(" the user is => ", user);

    if (user) {
      const updateUser = await userModel
        .findByIdAndUpdate(user, req.body, { new: true, runValidators: true })
        .select("-token -password");
      return res.status(200).send(updateUser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// controller to fetch the user
const listUser = async (req, res) => {
  try {
    const search = req.query.search;

    const searchQuery = {};
    if (search) {
      searchQuery = { userName: { $regex: search, $options: "i" } };
    }
    const UserLists = await userModel
      .find(searchQuery)
      .select("-token -password")
      .sort({ createdAt: 1 });

    const list = await userModel.countDocuments({});

    let data = {
      users: list,
      userData: UserLists,
    };
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Creating the refresh and normal token
const refreshToken = async (req, res) => {
  try {
    console.log("Refresh Token API----------->", req.user.id);
    const userData = await userModel.findOne({ _id: req.user.id });
    if (!userData) {
      throw Error(responseMessage.USER_NOT_FOUND);
    }

    const token = {
      accessToken: await createToken(userData, "30d"),
      refreshToken: await createToken(userData, "60d"),
    };

    // responseHelper.data(res, token, 200);
    res.status(200).json(token);
  } catch (err) {
    // responseHelper.failure(res, error, 400);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  userSignup,
  login,
  userLogout,
  changePswd,
  updateProfile,
  listUser,
  refreshToken,
};
