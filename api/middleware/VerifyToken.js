import jwt from "jsonwebtoken";
import TokenBlackList from "../models/TokenBlackListModel.js";
import Devices from "../models/DevicesModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    const tokenBlack = await TokenBlackList.findOne({ where: { token: token } });

    const device = await Devices.findOne({ where: { deviceToken: token } });

    if (tokenBlack && !device) {
      return res.status(498).json({ message: "Unauthorized: Invalid device or blacklisted token" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Token verification failed" });
      }

      // Attach decoded token onto request for downstream authorization logic.
      // Common fields could include: userId, roleId, companyId, driverId, etc.
      req.auth = decoded || {};

      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
