const mongoose = require("mongoose");
const clientSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: "Full Name is required",
    },
    Country: {
      type: String,
    },
    minimum_score: {
      type: String,
    },
    logo: {
      type: String,
    },
    Status: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    Banner: {
      type: Array,
    },
    Series_client: {
      type: Array,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Client = mongoose.model("Client", clientSchema);
module.exports = Client;