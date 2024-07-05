const express = require("express");
const {
  signup,
  signin,
  deleteAccount,
  updateName,
} = require("../controllers/authController");
const authenticateToken = require("../middlewares/authenticate");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/delete-account", authenticateToken, deleteAccount);
router.put("/update-name", authenticateToken, updateName);

module.exports = router;
