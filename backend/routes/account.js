const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

const transferSchema = zod.object({
  to: zod.string().required(),
  amount: zod.number().required().min(1),
});

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", async (req, res) => {});

module.exports = router;
