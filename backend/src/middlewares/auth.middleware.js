import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const AuthMiddleware = async (req, res, next) => {
  // check if user is authenticated
  // if not, send a 401 Unauthorized response
  // if yes, call next() to continue the request
  // TODO: implement authentication logic here
  try {
    const accessToken = req.headers?.authorization?.replace("Bearer ", "");
    if (!accessToken) res.status(401).json({ error: "unauthorized" });

    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!data) res.status(401).json({ error: "unauthorized" });

    const user = await User.findById(data._id).select("-password");
    if (!user) res.status(401).json({ error: "unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
    next(error);
  }
};

export default AuthMiddleware;
