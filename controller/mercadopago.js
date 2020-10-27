// Agrega credenciales
const mercadopago = require('mercadopago')

//credenciales
mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
})

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      id: '1234',
      title: 'Lightweight Paper Table',
      description: 'Inspired by the classic foldable art of origami',
      category_id: 'home',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: 100
    }
  ],

  "back_urls": {
		"success": "www.localhost:3000",
		"failure": "www.localhost:3000",
		"pending": "www.localhost:3000"
    },

  "auto_return": "approved",
  "payment_methods": {
      "excluded_payment_methods": [
          {
					"id": "amex"
          }
      ],
      "excluded_payment_types": [
          {
            "id": "atm"
          }
      ],
      "installments": 6
  },
  //"notification_url": "https://www.your-site.com/ipn",
  "statement_descriptor": "MINEGOCIO",
  //"external_reference": "Reference_1234",
  //"expires": true,
  //"expiration_date_from": "2016-02-01T12:00:00.000-04:00",
  //"expiration_date_to": "2016-02-28T12:00:00.000-04:00"
}

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
  // Este valor reemplazará el string "$$init_point$$" en tu HTML
  global.init_point = preference.body.init_point;
}).catch(function(error){
  console.log(error);
});

module.exports = MercadoPagoService;