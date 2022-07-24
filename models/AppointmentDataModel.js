import mongoose from "mongoose";
const appointmentDataSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    recomendations: {
        type: String,
        required: true,
    },
    medicine : {
        type: String,
    }
}
);
const AppointmentDataModel = mongoose.model("AppointmentData", appointmentDataSchema);
export default AppointmentDataModel;