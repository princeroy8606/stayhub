const express = require("express");
const router = express.Router();
const Houses = require("../controlers/houseControllers");
const upload = require("../utils/multer-config");

router.post("/new", upload.array("AccImages", 3), Houses.addHouses);
router.get("/accomodations/:id", Houses.getOwnersHouse);
router.post("/check", Houses.availabilityCheck);
router.put("/accomodation/edit/:id", upload.array("AccImages", 3), Houses.editHouseDetails);
router.delete('/accomodation/delete/:id', Houses.deleteAccomodation)
router.post('/newReview',Houses.addReview)

module.exports = router;