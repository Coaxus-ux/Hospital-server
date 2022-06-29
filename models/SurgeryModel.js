import mongoose from "mongoose";
const surgerySchema = mongoose.Schema({
  surgeryName: {
    type: String,
    required: true,
    trim: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.cities,
    ref: "departments",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const SurgeryModel = mongoose.model("Surgery", surgerySchema);
export default SurgeryModel;
