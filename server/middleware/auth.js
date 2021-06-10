const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  if (req.header("x-auth-token")) {
    const token = req.header("x-auth-token");
    try {
      await jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({
        messsage: "Unauthorised Request! Token Missing!",
      });
    }
  } else {
    res.status(401).json({
      messsage: "Unauthorised Request! Token Missing!",
    });
  }
};

module.exports = auth;
