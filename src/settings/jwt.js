const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXP } = process.env;
const userModel = require("../models/userModel");

//creating the token
const createToken = async (data, time) => {
  try {
    let contentData = {
      _id: data.id,
      email: data.email,
      userName: data.userName,
    };
    const token = await jwt.sign({ data: contentData }, JWT_SECRET, {
      expiresIn: time,
    });
    return token;
  } catch (error) {
    return error;
  }
};

// decoding the token value
const decodeToken = async (token) => {
  try {
    var decode = jwt.verify(token, JWT_SECRET);
    return decode;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createToken,
  decodeToken,
};
