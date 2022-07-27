import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataBaseConexion from "./config/dataBaseConexion.js";
import patientRoute from "./routes/patientRoute.js";
import adminRoute from "./routes/adminRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import generalRoute from "./routes/generalRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import surgeryRoute from "./routes/surgeryRoute.js";
import medicineRoute from "./routes/medicineRoute.js";
import appointmentDataRoute from "./routes/appointmentDataRoute.js";
const app = express();
app.use(express.json());
dotenv.config();
dataBaseConexion();
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Is no allowed by CORS"));
    }
  },

};
//app.use(cors(corsOptions));
app.use("/api/patient",cors(), patientRoute);
app.use("/api/admin", cors(), adminRoute);
app.use("/api/doctor", cors(), doctorRoute);
app.use("/api/user",cors(), generalRoute);
app.use("/api/appointment", cors(), appointmentRoute);
app.use("/api/surgery", cors(), surgeryRoute);
app.use("/api/medicine", cors(), medicineRoute);
app.use("/api/appointmentData", cors(), appointmentDataRoute);
app.use("/api/imgs", express.static("./uploads/userImages"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

