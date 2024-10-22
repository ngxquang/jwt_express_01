const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const white_lists = ["/", "/register", "/login"];
  if (white_lists.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      // verify
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            email: decoded.email,
            name: decoded.name,
            createdBy: "hoidanit"
        }
        next();
      } catch (error) {
        return res.status(401).json({
          message: "Token het han hoac khong hop le",
        });
      }
    } else {
      return res.status(401).json("You dont have access token or expire");
    }
  }
};

module.exports = auth;
