import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/connectDB.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8080;
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR : ", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`app is listning on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
  });
