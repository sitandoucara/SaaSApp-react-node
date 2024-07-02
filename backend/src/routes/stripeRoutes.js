const express = require("express");
const {
  createCheckoutSession,
  getCheckoutSession,
  createBillingPortalSession,
} = require("../controllers/stripeController");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.get("/checkout-session", getCheckoutSession);
router.post("/create-billing-portal-session", createBillingPortalSession);

module.exports = router;
