import { verifyToken } from './VerifyToken.js';
import User from '../models/UserModel.js';
import Role from '../models/RoleModel.js';
import Permission from '../models/PermissionModel.js';

export const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      // First verify the token
      await verifyToken(req, res, async () => {
        const userId = req.user?.id;
        
        if (!userId) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized - No user ID found'
          });
        }

        // Get user with role
        const user = await User.findByPk(userId, {
          include: [{
            model: Role,
            include: [{
              model: Permission
            }]
          }]
        });

        if (!user || !user.Role) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden - User has no role assigned'
          });
        }

        // Check if user's role has the required permission
        const hasPermission = user.Role.Permissions.some(
          permission => permission.name === requiredPermission
        );

        if (!hasPermission) {
          return res.status(403).json({
            success: false,
            message: 'Forbidden - Insufficient permissions'
          });
        }

        // Add user and role info to request for use in routes
        req.userRole = user.Role;
        next();
      });
    } catch (error) {
      console.error('Permission check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during permission check'
      });
    }
  };
}; 