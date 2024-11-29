const express = require("express");
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const transactionRouter = express.Router();

transactionRouter.get("/", auth, async (req, res) => {
  try {
    if (!req.userDetails.id) {
      return res.status(400).json({ status: "Error", error: "Please Login" });
    }
    const { amount, date, category, merchant, paymentMode } = req.query;
    let query = {};
    if (merchant) {
      query.merchant = merchant;
    }
    if (paymentMode) {
      query.paymentMode = paymentMode;
    }
    if (category) {
      query.category = category;
    }
    if (date) {
      if (date.gte) {
        query.date = {
          $gte: date.gte,
        };
      }
      if (date.lte) {
        query.data = {
          $lte: date.lte,
        };
      } else {
        query.date = date;
      }
    }
    if (amount) {
      if (amount.gte) {
        query.amount = {
          $gte: amount.gte,
        };
      }
      if (amount.lte) {
        query.amount = {
          $lte: amount.lte,
        };
      } else {
        query.amount = amount;
      }
    }
    const transactions = await Transaction.find({
      user: req.userDetails.id,
      ...query,
    });
    res.status(200).json({ status: "Success", transactions });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
});

transactionRouter.post("/", auth, async (req, res) => {
  try {
    if (!req.userDetails.id) {
      return res.status(400).json({ status: "Error", error: "Please Login" });
    }
    const transaction = new Transaction({
      ...req.body,
      user: req.userDetails.id,
    });
    await transaction.save();
    res.status(201).json({ status: "Success", transaction });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
});

transactionRouter.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.userDetails.id) {
      return res.status(400).json({ status: "Error", error: "Please Login" });
    }
    const id = req.params.id;
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ status: "Error", error: "Transaction not found" });
    }
    res.status(200).json({ status: "Success" });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
});

transactionRouter.patch("/:id", auth, async (req, res) => {
  try {
    if (!req.userDetails.id) {
      return res.status(400).json({ status: "Error", error: "Please Login" });
    }
    const id = req.params.id;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ status: "Error", error: "Transaction not found" });
    }

    Object.keys(req.body).forEach((t) => {
      transaction[t] = req.body[t];
    });

    await transaction.save();

    res.status(200).json({ status: "Success", transaction });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
});

module.exports = transactionRouter;
