const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: true,
    },
    date: {
      type: Date,
    },
    languages: {
      type: Array,
    },
    infos:{
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    link:{
        type:String
    }
  },
  {
    timestamps: true, //pour la date de creation automatique
  }
);

const Projet = mongoose.model("Projet", userSchema);

module.exports = Projet;



