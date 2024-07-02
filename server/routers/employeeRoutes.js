const express = require("express");
const router = express.Router();

const EMPLOYEE = require("../controlers/employeeController");
const { checkAccess } = require("../utils/middleware");

router.post("/new", checkAccess, EMPLOYEE.createNewEmploye);
router.get("/:id", checkAccess, EMPLOYEE.getAllEmployees);
router.get("/managers/all", checkAccess, EMPLOYEE.getAllManagers);
router.get("/users/all", checkAccess, EMPLOYEE.getAllUsers);
router.put("/update", checkAccess, EMPLOYEE.editEmployeeDetails);
router.delete("/delete/:id", checkAccess, EMPLOYEE.deleteEmployee);

module.exports = router;