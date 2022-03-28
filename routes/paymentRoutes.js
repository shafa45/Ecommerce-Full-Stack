// require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/payment', async (req, res) => {
  // create a stripe charge
  try {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'inr',
      description: 'Example charge',
      // source: req.body.stripeToken,
      source: req.body.tokenId,
    });

    res.status(200).json({
      status: 'success',
      charge,
    });
  } catch (err) {
    res.status(200).json({
      status: 'error',
      err,
    });
    console.log(err);
  }
});

// await stripe.charges.create(
//   {
//     source: req.body.tokenId,
//     amount: req.body.amount,
//     currency: 'inr',
//   },
//   (stripeErr, stripeRes) => {
//     if (stripeErr) res.status(500).json({ error: stripeErr });
//     else res.status(200).json(stripeRes);
//   }
//   );
// });

module.exports = router;
