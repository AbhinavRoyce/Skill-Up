import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import authRoutesFactory from "./routes/auth.js";
import jobsRoutes from "./routes/jobs.js";
import UserModel from "./models/User.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false
  }
);

// Init models
const User = UserModel(sequelize);

// Routes
app.use("/api/auth", authRoutesFactory(User));
app.use("/api/jobs", jobsRoutes);

app.get("/", (req, res) => {
  res.send("SkillUp API running");
});

// Start server & sync DB
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync();
    console.log("Models synchronized");

    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start backend:", err);
  }
})();
