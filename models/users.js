const mongoose = require("mongoose");

const users = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      default: "+91",
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },
    googleAuth: {
      type: Boolean,
      default: false,
      required: true,
    },

    role: {
      type: mongoose.Types.ObjectId,
      ref: "roles",
    },

    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Hold", "Suspended", "Inactive", "Deleted"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", users);
