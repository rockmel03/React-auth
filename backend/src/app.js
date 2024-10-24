import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// routes import
import userRouter from "./routes/user.routes.js";

//routes
app.use("/users", userRouter);

//default : send 404
app.all("*", (req, res) => {
  res.status(404).send({ error: "not found" });
});
export default app;
