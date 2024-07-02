const express = require("express");
const router = express.Router();
const AUTH = require("../controlers/authController");
const upload = require("../utils/multer-config");

router.post("/signup", upload.array("addressProof", 1), AUTH.SignUp);
router.post("/login", AUTH.Login);
router.post("/verify/email", AUTH.emailVerify);
router.post("/verify/otp", AUTH.OTPverify);
router.post("/update/password", AUTH.upDatePassword);

module.exports = router;
