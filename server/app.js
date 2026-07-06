const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

// env file
require("dotenv").config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

// allowing cors
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// parsing json data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// Serve  files from the public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// passport
require("./src/config/passport_config");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// database connection
const dbConfig = require("./src/config/db_config");
dbConfig(mongoURI);

//
const routes = require("./src/routes/index");
app.use("/api", routes);

const {
  khaltiPaymentCompletion,
} = require("./src/controller/admin/payment/payment_controller");
app.get("/complete-khalti-payment", khaltiPaymentCompletion);

app.listen(port, () => {
  console.log(`Server has successfully started on port ${port}.`);
});
