import mongoose from "mongoose";
const medicineSchema = mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
    trim: true,
  },
  medicineType: {
    type: String,
    required: true,
    trim: true,
  },
  medicineDescription: {
    type: String,
    required: true,
    trim: true,
  },
});
const MedicineModel = mongoose.model("Medicine", medicineSchema);
export default MedicineModel;
