import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import orderRoute from "./route/orderRoute.js";
import adminRoute from "./route/adminRoute.js";
import cors from "cors";
import CustomError from "./middleware/CustomError.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT,
  credentials: true,
};

app.use(cors(corsOptions));
connectDB();

//Routes

app.get("/", (req, res) => {
  res.send("API is running fine on Vercel 🎉");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin", adminRoute);

//Error for any other route
app.use("*", (req, res, next) => {
  return next(new CustomError("This route does not exist", 404));
});
app.use(errorMiddleware);

//Server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
