const mongoose = require("mongoose");

const fetchingEtherium = new mongoose.Schema(
  {
    ethereumPrice: {type: Number},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("etherium", fetchingEtherium);
