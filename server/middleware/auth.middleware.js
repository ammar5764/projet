const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    kwt.verify(token, process.env.TOKEN_SECRET, async (err, decotedToken) => {
      if (err) {
        res.locals.user = null
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findById(decotedToken);
        res.locals.user = user;
        console.log(user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
