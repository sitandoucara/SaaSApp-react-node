const express = require("express");
const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/adminController");
const authenticateToken = require("../middlewares/authenticate");
const authorizeAdmin = require("../middlewares/authorizeAdmin");

const router = express.Router();

router.get("/users", authenticateToken, authorizeAdmin, getAllUsers);
router.put(
  "/users/:id/role",
  authenticateToken,
  authorizeAdmin,
  updateUserRole
);

module.exports = router;
