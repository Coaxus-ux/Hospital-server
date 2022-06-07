import PatientModel from '../models/PatientModel.js';
import createID from '../helpers/createID.js';

const registerPatient = async (req, res) => {
    const { email, citizenshipCard } = req.body;
    // multplie await
    const validations = await Promise.all([
        PatientModel.findOne({ email }),
        PatientModel.findOne({ citizenshipCard }),
                    
    ]);
    if (validations.some(validation => validation)) {
        return res.status(400).json({
            msg: 'The email, emploeeId or citizenshipCard is already in use',
        });
    }
    try {
        const patient = new PatientModel(req.body);
        patient.token = createID();
        const result = await patient.save();
        res.json(result);
    } catch (error) {
        console.log(`Error creating patient ${error}`);
    }
}

export {
    registerPatient
}