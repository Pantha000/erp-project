const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  data: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manager",
      },
      status: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("attendence", attendenceSchema);
