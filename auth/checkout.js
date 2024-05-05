const Razorpay = require("razorpay");
const express = require("express");
var crypto = require("crypto");
const router = express.Router();
const Payment = require("../model/PaymentSchema");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

router.post("/checkout", async (req, res) => {
  try {
    var options = {
      amount: Number(req.body.fees * 100),
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
});

router.post("/paymentVerification", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
