// Required dependencies
require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs')

// initialise the app
const app = express();

app.use(session({
  secret : process.env.sessionSecret,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));
app.use(flash());


// initiating the port
const PORT = process.env.PORT

// setting view engine
app.set("view engine", "ejs");

// rendering static
app.use(express.static("public"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// routes grouping
app.use("/", require("./routes/index"));
app.use("/", require("./routes/contact"));

app.listen(PORT, () => console.log(`Sos Nigeria Server started at port http://localhost:${PORT}`))