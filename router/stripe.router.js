const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();

stripe = require("stripe")(process.env.STRIPE_SEC_KEY, {
    apiVersion: '2022-11-15',
  });



router.route('/stripeConfig')
        .get((req,res)=>{
            res.send({
                publishableKey: process.env.STRIPE_PUB_KEY
            })
        })

router.route("/create-payment-intent")
        .post( async (req, res) => {

            console.log(req.body.price);
            try {
              const paymentIntent = await stripe.paymentIntents.create({
                currency: "usd",
                amount: req.body.price*100,
              });
          
              // Send publishable key and PaymentIntent details to client
              res.send({
                clientSecret: paymentIntent.client_secret,
              });
            } catch (e) {
              return res.status(400).send({
                error: {
                  message: e.message,
                },
              });
            }
          })

module.exports = router