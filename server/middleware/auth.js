const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    if (req.headers?.authorization?.split(" ").length !== 2) {
      return res.status(400).json({ status: "Error", error: "Please Login" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_kEY");
    if (decoded) {
      req.userDetails = decoded;
    }
    next();
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
};

module.exports = auth;
