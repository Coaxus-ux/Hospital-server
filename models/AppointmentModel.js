import mongoose from "mongoose";
const appointmentSchema = mongoose.Schema({
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
    sugeryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Surgery",
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    state:{
        type: String,
        default: "Pendiente",
    }
});
const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
export default AppointmentModel;