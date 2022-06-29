import mongoose from "mongoose";
const departmentSchema = mongoose.Schema({
    identifier: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    departmentName: {
        type: String,
        required: true,
        trim: true,  
    },
    cities: {
        type: [String],
        required: true,
        trim: true,
    }
})

const DepartmentModel = mongoose.model("Departament", departmentSchema);
export default DepartmentModel;