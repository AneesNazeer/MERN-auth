import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Token from "../models/Token.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).send("User registered");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const activeTokens = await Token.find({ userId: user.id }).sort({
      createdAt: 1,
    });
    if (activeTokens.length >= 3) {
      const oldestToken = activeTokens[0];
      await Token.findByIdAndDelete(oldestToken._id);
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    await new Token({ userId: user.id, token: accessToken }).save();

    res.json({
      accessToken,
      refreshToken,
      user: { user: user?.name, email: user?.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const refreshToken = async (req, res) => {
  const { accessToken: OldAccessToken, refreshToken } = req.body;

  if (!refreshToken || !OldAccessToken) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accessToken = jwt.sign(
      { user: payload.user },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    );

    const updatedToken = await Token.findOneAndUpdate(
      { userId: payload.user.id, token: OldAccessToken },
      { token: accessToken },
      { new: true }
    );

    if (!updatedToken) {
      return res.sendStatus(403);
    }

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(403);
  }
};

export const logout = async (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];

  try {
    await Token.findOneAndDelete({ token: token });

    res.json({ msg: "Logout successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const logoutAll = async (req, res) => {
  try {
    await Token.deleteMany({ userId: req.user.id });
    res.json({ msg: "Logged out from all devices" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
