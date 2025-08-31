import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apodRoute from "./routes/apod.js";

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS so frontend can call backend
app.use(cors());

// Routes
app.use("/api/apod", apodRoute);

 
const PORT = 5000;
app.listen(PORT, () => console.log(`  Server running on port ${PORT}`));
