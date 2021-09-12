const jwt = require("jsonwebtoken");
const User = require("./Models/User");

module.exports = verify = (req, res, next) => {
  const header = req.headers.token;

  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.MY_SECRET, (err, data) => {
      if (err) {
        res.status(403).send("token not valid");
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.send("You are not authenticated");
  }
};
