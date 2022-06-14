import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataBaseConexion from "./config/dataBaseConexion.js";
import patientRoute from "./routes/patientRoute.js";
import adminRoute from "./routes/adminRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import generalRoute from "./routes/generalRoute.js";
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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
