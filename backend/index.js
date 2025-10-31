import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
import http from "http"
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";

dotenv.config();
const app = express();
const server=http.createServer(app)

const io=new Server(server,{
  cors:{
  origin: "http://localhost:5173", // frontend ka URL
  credentials: true,
  methods:['POST','GET']
}
})

app.set("io",io)

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
app.use("/api/order", orderRouter);

socketHandler(io)
// ✅ Server Start
server.listen(port, () => {
  console.log(`🚀 Server started at ${port}`);
});
