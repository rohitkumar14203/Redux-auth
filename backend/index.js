import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
connectDB();
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "https://redux-auth-sigma.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json()); // parse raw json
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is up baby...`);
});
