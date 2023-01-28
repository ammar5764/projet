const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024, //vu que le password est cryptee ca peut etre long
      minlength: 6,
    },
    picture: {
      type: String,
      default: '../../client/public/uploads/profil/random-user.png'
    },
    bio: {
      type: String,
      max: 1024,
    },
      followers: {
        type: [String],
      },
      following:{
        type:[String]
      },
      likes: {
        type: [String]
      }
  },
  {
    timestamps: true, //pour la date de creation automatique
  }
);

//salage du mot de passe
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); //on va  "saler" le mot de passe avec la methode gensalt de bcrypt
  this.password = await bcrypt.hash(this.password, salt);
  next(); //une fois le password saler alors next() cad passe a l'autre function
});

//desalage password
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema); //c'est le mot User+s qui sera ajoute a la base de donnees

module.exports = User;
