const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-28",
});

exports.createCheckoutSession = async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};
