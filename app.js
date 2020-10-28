const express = require('express')
const exphbs  = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express()

var port = process.env.PORT || 3000;

//importamos el controller
const PaymentController = require("./controllers/PaymentController");

//importamos el service
const PaymentService = require("./services/PaymentService"); 

// Permitimos que el controller pueda usar el service
const PaymentInstance = new PaymentController(new PaymentService()); 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/detail', function (req, res) {
  res.render('detail', req.query);
});

app.use(express.static('assets'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/assets', express.static(__dirname + '/assets'));

app.post("/payment/new", (req, res) => 
  PaymentInstance.getMercadoPagoLink(req, res) 
);

app.post("/webhook", (req, res) =>
  PaymentInstance.webhook(req, res)
);

app.listen(port,() => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;