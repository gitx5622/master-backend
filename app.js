import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use(express.json())
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.NODE_ENV || 9000;
const HOST = '0.0.0.0';

app.listen(
  PORT,
  HOST,
  console.log(
    `Server running in ${process.env.NODE_ENV} on ${PORT}`.cyan.underline
  )
);
