// middleware/clerkMiddleware.js
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

module.exports = ClerkExpressRequireAuth();
