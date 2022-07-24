import Medicine from '../models/MedicineModel.js';

const createMedicine = async (req, res) => {
    const {medicineName, medicineType, medicineDescription} = req.body;
    if(!medicineName || !medicineType || !medicineDescription) {
        return res.json({
            state: false,
            msg: 'Faltan datos'
        });
    }
    const uniqueMedicine = await Medicine.findOne({medicineName});
    if(uniqueMedicine) {
        return res.json({
            state: false,
            msg: 'El medicamento ya existe'
        });
    }
    try{
        const medicine = new Medicine( req.body );
        await medicine.save();
        res.json({
            state: true,
            msg: 'Medicina creada'
        });
    }catch (error) {
        console.log(`Error creating medicine ${error}`);
        res.json({
            state: false,
            msg: "Error creando medicina"
        });
    }
}
const getMedicines = async (req, res) => {
    try{
        const medicines = await Medicine.find();
        res.json({
            state: true,
            result: medicines
        });
    }catch (error) {
        console.log(`Error getting medicines ${error}`);
        res.json({
            state: false,
            msg: "Error obteniendo medicinas"
        });
    }
}
export { createMedicine, getMedicines };