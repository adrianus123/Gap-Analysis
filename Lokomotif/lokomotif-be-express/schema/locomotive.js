const mongoose = require("mongoose");

const LocomotiveSchema = mongoose.Schema({
  locoCode: { type: String, required: true },
  locoName: { type: String, required: true },
  locoWeight: { type: Number, required: true },
  locoLength: { type: Number, required: true },
  locoWidth: { type: Number, required: true },
  locoHeight: { type: Number, required: true },
  locoStatus: { type: String, required: true },
  timestamps: { type: Date, required: true },
});

const Locomotive = mongoose.model("Locomotive", LocomotiveSchema);

module.exports = Locomotive;
