const axios = require('axios');

class PaymentService {
	constructor(){
		this.tokensMercadoPago = {
			prod: {},
			test: {
				access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
				integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
			}
		};
		this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
	}

	// recibimos las props que le mandamos desde el PaymentController
	async createPaymentMercadoPago(name, price, unit, img){
		const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`; 
		
		const	items = [
			{
				id: '1234',
				title: 'Lightweight Paper Table',
				description: 'Inspired by the classic foldable art of origami',
				category_id: 'home',
				quantity: 1,
				currency_id: 'ARS',
				unit_price: 100,
				picture_url: 'https://http2.mlstatic.com/D_NQ_NP_666172-MLA40642090935_022020-O.webp'
			}
		]
			
		const preference = {
			items,
			// el array de objetos, items que declaramos más arriba
			external_reference: "referencia del negocio",
			payer: { 
			// información del comprador, si estan en producción tienen que //traerlos del request
			//(al igual que hicimos con el precio del item) 
				name: "Lalo",
				surname: "Landa",
				email: "test_user_63274575@testuser.com",
				// si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
				phone: {
					area_code: "11",
					number: "22223333"
				},
				address: {
					zip_code: "1111",
					street_name: "False",
					street_number: "123"
				},
				payment_methods: {
					excluded_payment_methods: [
						{
							id: "amex"
						}
					],
					excluded_payment_types: [
						{
							id: "atm"
						}
					],
					installments: 6
				},
			}, 
				
			back_urls: {
				success: "https://dsaldano-mp-ecommerce-node.herokuapp.com/",
				failure: "https://dsaldano-mp-ecommerce-node.herokuapp.com/",
				pending: "https://dsaldano-mp-ecommerce-node.herokuapp.com/"
			},
			auto_return: "approved",
			notification_url: "https://dsaldano-mp-ecommerce-node.herokuapp.com/webhook",
			statement_descriptor: "MINEGOCIO",
			auto_return: "approved" 
			//"external_reference": "Reference_1234",
			//"expires": true,
			//"expiration_date_from": "2016-02-01T12:00:00.000-04:00",
			//"expiration_date_to": "2016-02-28T12:00:00.000-04:00"
		};

		try {
			const request = await axios.post(url, preferences,{
				headers: {
					"Content-type": "application/Json"
				}
			});
		} catch(e){
			console.log(e)
		}
	}		
}

module.exports = PaymentService;