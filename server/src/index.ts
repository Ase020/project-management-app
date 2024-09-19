import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Routes Imports
import projectRoutes from "./routes/projects.route";
import taskRoutes from "./routes/tasks.route";

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.get("/api", (req, res) => {
  res.send("This is the home route!");
});
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Server running on Port:${port}`));
