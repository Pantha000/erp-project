const mongoose = require("mongoose");

const labourExpensesSchema = new mongoose.Schema({
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manager",
  },
  title: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rate: {
    type: Number,
  },
  tAmount: {
    type: Number,
  },
  payment: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  remarks: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("labourExpenses", labourExpensesSchema);
