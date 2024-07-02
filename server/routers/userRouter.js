const express = require("express");
const router = express.Router();

const USER = require("../controlers/userConntroller");

router.post("/update", USER.updateUserDetails);
router.get("/likes/:id", USER.likedHouses);
router.post("/likes/update", USER.updateLike);
router.put("/delete", USER.deleteUser);

module.exports = router;
