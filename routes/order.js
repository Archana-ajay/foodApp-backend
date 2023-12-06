const express = require("express");
const router = express.Router();

const { postOrder, getOrder } = require("../controllers/order");

router.post("/order", postOrder);
router.get("/order", getOrder);

module.exports = router;
