import AdminModel from '../models/AdminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
const validator = async (email, emploeeId, citizenshipCard) => {
    const validationEmail = await Promise.all([
        AdminModel.findOne({ email }),
        PatientModel.findOne({ email }),
        DoctorModel.findOne({ email }),
    ]);
    if(emploeeId !== false){
        const validationEmploeeId = await Promise.all([
            AdminModel.findOne({ emploeeId }),
            DoctorModel.findOne({ emploeeId }),
        ]);
        if (validationEmploeeId.some(validation => validation)) {
            return {
                state: false,
                msg: 'El número de empleado ya existe'
            }
        }
    }
    const validationCitizenshipCard = await Promise.all([
        AdminModel.findOne({ citizenshipCard }),
        PatientModel.findOne({ citizenshipCard }),
        DoctorModel.findOne({ citizenshipCard }),
    ]);
    if (validationEmail.some(validation => validation)) {
        return {
            state: false,
            msg: 'El correo electrónico ya existe'
        }
    }
    
    if (validationCitizenshipCard.some(validation => validation)) {
        return {
            state: false,
            msg: 'La cédula ya existe'
        }
    }
    return {
        state: true,
        msg: 'Todos los datos son válidos'
    }
}
export default validator;