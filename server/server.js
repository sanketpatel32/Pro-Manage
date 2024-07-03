import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import connectToMongoDB from './utils/connectToMongoDB.js';

dotenv.config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();
app.use(express.json());
const corsOptions = {
    credentials: true,
    origin: "*",
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes)
app.use("/api/task",taskRoutes)
app.use("/check", (req, res) => res.json({ "message": "Checked" }));


app.use(express.static(path.join(__dirname, "/client/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"client","dist", "index.html"));
    // res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${port}`);
});
