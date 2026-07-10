import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "App is running healthy",
  });
});

app.use("/api/auth", authRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;
