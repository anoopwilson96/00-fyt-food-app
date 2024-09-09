import Razorpay from "razorpay";
import express from "express";
import crypto from "crypto";

// Initialize Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.RAZROPAY_K_ID,
  key_secret: process.env.RAZROPAY_K_SECRET,
});

// Create an order
export const createOrder = async (req, res, next) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Razorpay expects the amount in paise (INR's smallest unit)
      currency: "INR",
      receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`, // Create a unique receipt ID
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    return res.status(500).json({
      message: "Something went wrong in order creation",
      error: error.message,
    });
  }
};

// Verify the payment
export const verifyPayment = async (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  try {
    // Verify the signature to confirm payment
    const hmac = crypto.createHmac("sha256", process.env.RAZROPAY_K_SECRET);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
