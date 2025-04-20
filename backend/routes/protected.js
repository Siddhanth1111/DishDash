// routes/protected.js
const express = require("express");
const router = express.Router();
const clerkAuth = require("../middlewares/clerkMiddleware");

router.get("/profile", clerkAuth, (req, res) => {
  const { userId, sessionId } = req.auth;
  res.json({ message: "Protected route accessed", userId, sessionId });
});

module.exports = router;
