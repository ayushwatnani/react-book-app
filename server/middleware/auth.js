const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded.user);
    req.user = decoded.user;
    req.user.token = token;
    console.log(req.user.token)
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
