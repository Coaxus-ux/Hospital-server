import AdminModel from '../models/adminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
import createID from '../helpers/createID.js';

const registerAdmin = async (req, res) => {
    const { email, emploeeId, citizenshipCard } = req.body;
    // multplie await
    const validationEmail = await Promise.all([
        AdminModel.findOne({ email }),
        PatientModel.findOne({ email }),
        DoctorModel.findOne({ email }),
    ]);
    const validationEmploeeId = await Promise.all([
        AdminModel.findOne({ emploeeId }),
        DoctorModel.findOne({ emploeeId }),
    ]);
    const validationCitizenshipCard = await Promise.all([
        AdminModel.findOne({ citizenshipCard }),
        PatientModel.findOne({ citizenshipCard }),
        DoctorModel.findOne({ citizenshipCard }),
    ]);
    if (validationEmail.some(validation => validation)) {
        return res.json({
            state: false,
            msg: 'El correo electrónico ya está en uso'
        });
    }
    if (validationEmploeeId.some(validation => validation)) {
        return res.json({
            state: false,
            msg: 'El ID de empleado ya está registrado'
        });
    }
    if (validationCitizenshipCard.some(validation => validation)) {
        return res.json({
            state: false,
            msg: 'La cédula ya está registrada'
        });
    }
    try {
        const admin = new AdminModel(req.body);
        admin.token = createID();
        const result = await admin.save();
        res.json({
            state: true,
            result: result
        });
    } catch (error) {
        console.log(`Error creating administrator  ${error}`);
    }
}
export {
    registerAdmin
}