import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:5173", // frontend ka URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Database Connect
connectDb();

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);

// ✅ Server Start
app.listen(port, () => {
  console.log(`🚀 Server started at ${port}`);
});
