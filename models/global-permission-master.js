const mongoose = require("mongoose");

const globalPermissionMaster = mongoose.Schema(
  {
    permissionName: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive", "Deleted"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "globalPermissionMaster",
  globalPermissionMaster
);
