import mongoose from "mongoose";
import bcrypt from "bcrypt";
const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    emploeeId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    citizenshipCard:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        trim: true,
    },
    birthDate:{
        type: Date,
        required: true,
    },
    token:{
        type: String,
        trim: true,
    },
    isConfirmed:{
        type: Boolean,
        default: false,
    },
    userType:{
        type: String,
        default: "patient",
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    userType:{
        type: String,
        default: "doctor",
    }
    
}, {
    timestamps: true,
});
doctorSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
doctorSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;