import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import userRouter from "./routes/userRoutes";
import recipeRouter from "./routes/recipeRoutes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/recipes", recipeRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to TypeScript backend!");
});

connectToDatabase(process.env.MONGO_URI || " ")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
