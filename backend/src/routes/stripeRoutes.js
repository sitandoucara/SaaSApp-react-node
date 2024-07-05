const express = require("express");
const {
  createCheckoutSession,
  getCheckoutSession,
  createBillingPortalSession,
} = require("../controllers/stripeController");
const authenticateToken = require("../middlewares/authenticate");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post(
  "/create-checkout-session",
  authenticateToken,
  createCheckoutSession
);
router.get("/checkout-session", authenticateToken, getCheckoutSession);
router.post(
  "/create-billing-portal-session",
  authenticateToken,
  createBillingPortalSession
);
router.post(
  "/update-stripe-customer-id",
  authenticateToken,
  async (req, res) => {
    const { userId, stripeCustomerId } = req.body;
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      });
      res
        .status(200)
        .json({ message: "Stripe customer ID updated successfully" });
    } catch (error) {
      console.error("Error updating stripe customer ID:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating stripe customer ID" });
    }
  }
);

module.exports = router;
