const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

//Création d'une session de paiement pour l'abonnement
exports.createCheckoutSession = async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { priceId } = req.body;

  try {
    // Création de la session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/subscription`,
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

// Récupération des informations de la session de paiement
exports.getCheckoutSession = async (req, res) => {
  const { sessionId } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json(session);
  } catch (e) {
    res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

// Création d'une session de portail de facturation Stripe
exports.createBillingPortalSession = async (req, res) => {
  const { customerId } = req.body;
  const returnUrl = process.env.DOMAIN;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    console.log("Billing Portal Session created:", portalSession);
    res.status(200).json({ url: portalSession.url });
  } catch (e) {
    console.error("Error creating billing portal session:", e.message);
    res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};
