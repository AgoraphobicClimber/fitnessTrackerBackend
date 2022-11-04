const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env.JWT_SECRET;

const authRequired = (req, res, next) => {
  const token = req.signedCookies.token;
  console.log("Cookie Token:", token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    console.log("REQ.USER: ", req.user);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }
  next();
};

module.exports = authRequired;
