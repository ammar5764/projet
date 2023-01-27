const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decotedToken) => {
      if (err) {
        res.locals.user = null
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findById(decotedToken.id);
        res.locals.user = user;
        console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

 //pour la premiere connexion pour ne pas se reconnecter a chaque fois lorsqu'on arrive sur le site
exports.requireAuth=(req,res,next)=>{
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decotedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decotedToken.id);
        next();
      }
    });
  } else {
    console.log("no token");
  }
};

