import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import swaggerSetup from "./swagger.js";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

connectDB();

// Init Middleware
app.use(express.json());
swaggerSetup(app);

app.use(cors()); // Allow all origins

// const corsOptions = {
//     origin: 'http://yourfrontenddomain.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };

//   app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
