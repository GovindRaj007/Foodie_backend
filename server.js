import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/order.js"; // Import orderRouter
import 'dotenv/config';

const app = express();
const port =process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter); // Use orderRouter

app.get("/", (req, res) => {
  res.send("<h1> Welcome to Foodie Backend");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
