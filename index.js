const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3000;
const router = require("./routers/router");
const bodyParser = require("body-parser");
const session = require('express-session');
const passports = require('./libs/passport');


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended :false
}));
app.set('view engine', 'ejs')
app.set('views', "./pages") 
app.use(morgan("dev"))
app.use(session({ secret: 'yoursecret', resave: true,  saveUninitialized: true }));
app.use(passports.initialize());    
app.use(passports.session());

app.use("/",router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));