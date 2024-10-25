import { allowedOrigins } from "../constants.js";

const corsOptions = {
  origin: (origin, cb) => {
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      (process.env.NODE_ENV === "development" && !origin)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
