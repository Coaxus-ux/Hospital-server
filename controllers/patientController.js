import AdminModel from '../models/adminModel.js';
import PatientModel from '../models/PatientModel.js';
import DoctorModel from '../models/DoctorModel.js';
import createID from '../helpers/createID.js';
import { sendEmail } from '../helpers/emailSender.js';
import Patient from '../models/PatientModel.js';
const registerPatient = async (req, res) => {
    const { email, citizenshipCard } = req.body;
    await delete req.body.emploeeId;

    // multplie await
    const validationEmail = await Promise.all([
        AdminModel.findOne({ email }),
        PatientModel.findOne({ email }),
        DoctorModel.findOne({ email }),
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
    if (validationCitizenshipCard.some(validation => validation)) {
        return res.json({
            state: false,
            msg: 'La cédula ya está registrada'
        });
    }
    try {
        const patient = new PatientModel(req.body);
        patient.token = createID();
        const result = await patient.save();
        sendEmail(
            {
                email: result.email,
                name: result.name,
                token: result.token
            }
        )
        res.json({
            state: true,
            result: result
        });
        
    } catch (error) {
        console.log(`Error creating patient ${error}`);
    }
}

export {
    registerPatient
}