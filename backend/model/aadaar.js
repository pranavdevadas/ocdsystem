import mongoose from "mongoose";

const aadhaarSchema = mongoose.Schema(
  {
    aadhaarnumber: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Aadhaar = mongoose.model("Aadhaar", aadhaarSchema);

export default Aadhaar;
