import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connect from "./config/connection.js";
import { errorHandler } from "./utils/handle-error.js";
import taskRoutes from "./routes/task.route.js";
const app = express();
//middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/api/tasks", taskRoutes);
app.use(errorHandler);
//database connection
connect();

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
