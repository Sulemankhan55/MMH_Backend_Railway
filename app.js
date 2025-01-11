import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import patientRouter from "./routers/patientRoute.js";
import userRouter from "./routers/userRouter.js";
import morgan from "morgan";
import dashboardRoute from "./routers/dashboardRoute.js";


dotenv.config();


connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Express Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

// Routes
app.use("/patient", patientRouter);
app.use("/user", userRouter);
app.use("/mmh", dashboardRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
