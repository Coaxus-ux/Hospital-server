import jwt from "jsonwebtoken";
import AdminModel from '../models/AdminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
const JWTValidator = async (req, res) => {
  const { jwtToken } = req.params;
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if(decoded.userType === 'admin'){
        const admin = await AdminModel.findById(decoded.id);
        if(!admin){
            return res.json({
                state: false,
                msg: 'El usuario no existe'
            });
        }
        if(!admin.isConfirmed){
            return res.json({
                state: false,
                msg: 'El usuario no está confirmado'
            });
        }
        return res.json({
            state: true,
            msg: 'El usuario es válido',
            userType: 'admin'
        });
    }
    if (decoded.userType === 'patient') {
        const patient = await PatientModel.findById(decoded.id);
        if (!patient) {
            return res.json({
                state: false,
                msg: 'El usuario no existe'
            });
        }
        if (!patient.isConfirmed) {
            return res.json({
                state: false,
                msg: 'El usuario no está confirmado'
            });
        }
        return res.json({
            state: true,
            msg: 'El usuario es válido',
            userType: 'patient'
        });
    }
    if (decoded.userType === 'doctor') {
        const doctor = await DoctorModel.findById(decoded.id);
        if (!doctor) {
            return res.json({
                state: false,
                msg: 'El usuario no existe'
            });
        }
        if (!doctor.isConfirmed) {
            return res.json({
                state: false,
                msg: 'El usuario no está confirmado'
            });
        }
        return res.json({
            state: true,
            msg: 'El usuario es válido',
            userType: 'doctor'
        });
    }
  }catch(error){
    return res.json({ 
        state: false,
        msg: 'El token no es válido'
     });
  }
};
export { JWTValidator };
