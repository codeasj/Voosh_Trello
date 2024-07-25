import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./config/connection.js";
import { errorHandler } from "./utils/handle-error.js";
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
export { __dirname };

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.static(path.join(__dirname, "/uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

//database connection
connect();
//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
