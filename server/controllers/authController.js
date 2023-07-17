const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { signUpErrors, signInErrors } = require("../utils/error.utils");

exports.signUp = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const user = await User.create({ name, username, email, password });
    //user.save();
    res.status(201).send({ user: user });
    //  console.log("user",user);
  } catch (err) {
    const errors = signUpErrors(err);

    res.status(200).send({ errors });
  }
};
//-------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  // Recherchez l'utilisateur dans la base de données.
  const user = await User.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      // Utilisateur trouvé, générer le token et renvoyer la réponse.
      const payload = { userId: user.id, email: user.email };

      const maxAge = 3 * 24 * 60 * 60 * 1000; //3 ici correspond au nombre de jours

      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
      });
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      console.log("userData", userData);
      // Renvoyez à la fois le token et les informations de l'utilisateur dans la réponse JSON.
      res.json({ token, user: userData });
    } else {
      throw Error("incorrect password");
    }
  } else {
    // Utilisateur non trouvé, renvoyer une réponse d'erreur.
    res.status(401).json({ message: "Identifiants invalides" });
  }
};

exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};





