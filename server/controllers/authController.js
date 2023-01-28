const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.signUp = async (req, res) => {
  const { name, username, email, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(401).json({ error: "ce mail est deja utilises" });
  } else {
    try {
      const user = await User.create({ name, username, email, password });
      //user.save();
      res.status(201).send({ user: user });
    } catch (err) {
      console.log(err);

      res.status(200).send({ err });
    }
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //creation token lors d'un login
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) { }
};

const maxAge = 3 * 24 * 60 * 60 * 1000; //3 ici correspond au nombre de jours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

// exports.signIn=async(req,res)=>{
//   const {email,password} = req.body;

//     const user = await User.findOne({ email})
//     if(!user)
//     {
//       res.status(401).json({ error: 'email doesnt exist' });
//     }else{
//       //decrypt password
//       bcrypt.compare(password, user.password)
//       .then(valid => {
//         if (!valid) {
//           console.log(valid);
//           res.status(401).json({ error: 'wrong password' });
//         }else{
//           console.log(valid);
//           res.status(200).json({
//             token: jwt.sign(
//               { userId: user._id },
//               'RANDOM_TOKEN_SECRET',
//               { expiresIn: '24h'}
//             ),
//             message: 'connexion successful.'
//           });
//         }
//       })
//       .catch(error => res.status(500).json({ error }));
//     }
//   };
