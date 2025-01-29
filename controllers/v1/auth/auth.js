const {
  globalPermissionMaster,
  roles,
  globalRolePermissions,
  users,
} = require("../../../models");
const { auth } = require("../../../services/v1");
const { hashPassword } = require("../../../utils/hash");

const login = async (req, res, next) => {
  try {
    const resposne = await auth.login(req);
    return resposne;
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
};
