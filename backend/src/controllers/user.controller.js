import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function generateAuthTokens(user) {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Failed to generate Tokens: ", error);
    throw new Error("Failed to generate Tokens");
  }
}

export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const users = await User.find()
      .limit(limit) // limit number of documents returned
      .skip(skip) //skip documents
      .select("-password");

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      message: "users fetch successfully",
      totalUsers,
      totalPages,
      currentPage: page,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "username and password is required" });
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(403).json({ error: "user already exists" });

    const user = await User.create({ username, password });

    // generate tokens
    const { accessToken, refreshToken } = await generateAuthTokens(user);

    if (!accessToken || !refreshToken) throw Error("failed to generate tokens");

    // Convert the user document to a plain object and delete sensitive fields
    const userData = user.toObject();
    delete userData.password;
    delete userData.refreshToken;

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true, // Can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Sent only over HTTPS (use true in production)
        sameSite: "Strict", // Helps mitigate CSRF attacks
        maxAge: 2592000000, // Set the expiry to 30 days
      })
      .json({
        message: "user registered sucessfully!",
        accessToken,
        user: userData,
      });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "username and password is required" });
  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: "invalid credentials" });

    const isMatch = user.comparePassword(password);
    if (!isMatch) return res.send(400).json({ error: "invalid credentials" });

    const { accessToken, refreshToken } = await generateAuthTokens(user);

    if (!accessToken || !refreshToken) throw Error("failed to generate tokens");

    // Convert the user document to a plain object and delete sensitive fields
    const userData = user.toObject();
    delete userData.password;
    delete userData.refreshToken;

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true, // Can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Sent only over HTTPS (use true in production)
        sameSite: "Strict", // Helps mitigate CSRF attacks
        maxAge: 2592000000, // Set the expiry to 30 days
      })
      .json({
        message: "user loged in",
        accessToken,
        user: userData,
      });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) return res.status(400).json({ error: "user not found" });

    res.status(200).json({ message: "user fetched sucessfully", user });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const refreshUserTokens = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken)
    return res.status(403).json({ error: "refresh token not found" });
  try {
    const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

    const user = await User.findById(data._id);
    if (!user) return res.status(403).json({ error: "invalid refresh token" });

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAuthTokens(user);

    res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true, // Can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Sent only over HTTPS (use true in production)
        sameSite: "Strict", // Helps mitigate CSRF attacks
        maxAge: 2592000000, // Set the expiry to 30 days
      })
      .json({
        message: "sucessfuly refresh tokens",
        accessToken,
      });
  } catch (error) {
    res.status(500).json({ error: "internal server error : " + error.message });
  }
};
