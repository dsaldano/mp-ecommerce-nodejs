const express = require('express')
const exphbs  = require('express-handlebars');
const axios = require('axios');
//const MercadoPagoService = require('./controller/mercadopago');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express()
//const port = 3000
var port = process.env.PORT || 3000;

//importamos el controller
const PaymentController = require("./controllers/PaymentController");

//importamos el service
const PaymentService = require("./services/PaymentServices"); 

// Permitimos que el controller puseda usar el service
const PaymentInstance = new PaymentController(new PaymentService()); 
//const MercadoPagoServiceInstance = new MercadoPagoService();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/detail', function (req, res) {
  res.render('detail', req.query);
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.post("/payment/new", (req, res) => 
  PaymentInstance.getMercadoPagoLink(req, res) 
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));


app.listen(port,() => {
  console.log(`Example app listening at http://localhost:${port}`)
});
