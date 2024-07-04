const express = require("express");
const {
  createCheckoutSession,
  getCheckoutSession,
  createBillingPortalSession,
} = require("../controllers/stripeController");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

router.post(
  "/create-checkout-session",
  authenticateToken,
  createCheckoutSession
);
router.get("/checkout-session", getCheckoutSession);
router.post(
  "/create-billing-portal-session",
  authenticateToken,
  createBillingPortalSession
);

module.exports = router;
