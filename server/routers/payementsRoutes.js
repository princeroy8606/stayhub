const express = require("express");
const router = express.Router();
const Payments = require("../controlers/paymentsController");
const { checkAccess } = require("../utils/middleware");

router.get("/balance", Payments.getBalance);
router.get("/chart",checkAccess, Payments.getAllChartData);

module.exports = router;
