const functions = require("firebase-functions");

var express = require('express');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51Id8NDSG8qXTFbmpsR32UteV0GDcz9ZZgny1WuFmx4UkATFxsjZS4l9nuDHT8KWc4wiZDsko503x0qJJWjRCs4dS00Sh8XakLQ');
//use the express server for backend
var app = express();
//var port = process.env.PORT || 4000;

// enable CORS
app.use(cors());
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// confirm the paymentIntent
app.post('/pay', async (request, response) => {
  try {
    // Create the PaymentIntent
    let intent = await stripe.paymentIntents.create({
      payment_method: request.body.payment_method_id,
      description: "Test payment",
      amount: request.body.amount * 100,
      currency: 'inr',
      confirmation_method: 'manual',
      confirm: true
    });
    // Send the response to the client
    response.send(generateResponse(intent));
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});

const generateResponse = (intent) => {
  if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true
    };
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    };
  }
};

// request handlers
app.get('/', (req, res) => {
  res.send('Stripe Integration! - Clue Mediator');
});

// app.listen(port, () => {
//   console.log('Server started on: ' + port);
// });

exports.api = functions.https.onRequest(app);


//http://localhost:5001/bookbank-aba23/us-central1/api