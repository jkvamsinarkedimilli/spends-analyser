const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: mongoose.SchemaTypes.ObjectId,
  amount: {
    type: Number,
    min: [1, "Amount cannot be less than 1"],
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
