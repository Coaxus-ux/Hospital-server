import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataBaseConexion from "./config/dataBaseConexion.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
const app = express();
app.use(express.json());
dotenv.config();
dataBaseConexion();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});