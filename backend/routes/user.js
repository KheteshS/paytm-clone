const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

// signUp route
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Email already in use / Invalid inputs",
    });
  }

  const existingUser = User.findOne({
    username: body.username,
  });

  if (existingUser._id) {
    return res.status(411).json({
      message: "Email already in use / Invalid inputs",
    });
  }

  const user = await User.create(body);
  const userId = user._id;

  await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  return res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

// signIn route
router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (existingUser) {
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  }

  return res.status(411).json({
    message: "Error while logging in",
  });
});

// update User Information
router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  return res.status(200).json({
    message: "User updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
