const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

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
app.use(cookieParser());

app.use(express.json());

//cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ["sessionId", 'Content-Type'],
  'exposedHeaders': ["sessionId"],
  'methods': "GET,HEAD,PUT,PATCH,POST,DELETE",
  'preflightContinue': false,
};

app.use(cors({corsOptions}));

//jwt

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Listening on port : ` + PORT);
});
