const mongoose = require("mongoose");

const job = new mongoose.Schema(
  {
    job: {
      type: String,
      required: true,
    },
    jobDescription: {
        type: String,
        required: true,
      },
    isDeleted:{
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", job);
