import mongoose from "mongoose";

const mongoConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
    } catch (error) {
        console.log(`Fail to conect: ${error}`);
        process.exit(1);
    }
}
export default mongoConnection;