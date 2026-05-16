import RolePermissionModel from "../models/RolePermissionModel.js";
import PermissionModel from "../models/PermissionModel.js";
import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
class Helper {
  async checkPermission(req, permName) {
    try {
      const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization;
      if (!token) throw new Error("No token provided");

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const roleId = decoded.roleId;

      const perm = await PermissionModel.findOne({
        where: { perm_name: permName }
      });
      
      if (!perm) throw new Error("Permission does not exist");

      const rolePermission = await RolePermissionModel.findOne({
        where: {
          role_id: roleId,
          permissionId: perm.id,
        }
      });

      return !!rolePermission;

    } catch (error) {
      console.error("Permission check error:", error);
      return false;
    }
  }

  async getUserRoleId(accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await Users.findByPk(decoded.userId);
      return user?.roleId;
    } catch (error) {
      console.error("Role ID error:", error);
      return null;
    }
  }
}

export default Helper;
