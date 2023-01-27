const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
      trim: true,
    },
  },

  {
    timestamps: true, //pour la date de creation automatique
  }
);

const Blog = mongoose.model("Blog", userSchema);

module.exports = Blog;
