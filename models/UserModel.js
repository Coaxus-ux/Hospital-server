import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
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
    token:{
        type: String,
        trim: true,
    },
    isConfirmed:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
const User = mongoose.model("User", userSchema);
export default User;