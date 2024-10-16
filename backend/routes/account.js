const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const transferSchema = zod.object({
  to: zod.string(),
  amount: zod.number().min(1).positive(),
});

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const body = req.body;
  const { success } = transferSchema.safeParse(body);

  if (!success) {
    await session.abortTransaction();
    session.endSession();
    return res.status(411).json({
      message: "Invalid inputs",
    });
  }

  const { amount, to } = body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  // commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
