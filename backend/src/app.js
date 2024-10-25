import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// routes import
import userRouter from "./routes/user.routes.js";
import corsOptions from "./config/corsOptions.js";

//routes
app.use("/users", userRouter);

//default : send 404
app.all("*", (req, res) => {
  res.status(404).send({ error: "not found" });
});

export default app;
