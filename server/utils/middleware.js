const Jwt = require("jsonwebtoken");
const Employee = require("../models/owner");

exports.Checker = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  Jwt.verify(token, process.env.SECRECT_KEY, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Token invalid" });
    }

    next();
  });
};


exports.checkAccess = async (req, res, next) => {
  const adminId = req.headers.adminid;
  const admin = await Employee.findById(adminId);
  if (!admin) 
    return res.status(401).json({ message: "You are not authorized" });
  next();
};
