const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser=require('cookie-parser');
const cors = require("cors");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/auth.middleware");

const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("success connected to mongoDB"))
  .catch((err) => console.log("failed connected to mongoDB", err));

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser())

app.use(express.json());

//jwt
app.get('*',checkUser)
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Listening on port : ` + PORT);
});

