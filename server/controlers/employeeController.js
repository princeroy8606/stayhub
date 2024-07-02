const Employee = require("../models/owner");
const { passwordHasher } = require("../utils/custom");
const Guest = require("../models/guest");

exports.createNewEmploye = async (req, res) => {
  const { Email, Phone, Password, Role, AdminId, Name } = req.body;
  try {
    const existingEmployee = await Employee.findOne({ email: Email });
    if (existingEmployee)
      return res.status(400).json({ message: "Email Already Exist" });
    const encryptedPassword = await passwordHasher(Password);
    const employee = new Employee({
      name: Name,
      email: Email,
      phone: Phone,
      role: Role,
      password: encryptedPassword,
    });
    await employee.save();
    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  const AdminId = req.params.id;
  try {
    const admin = await Employee.findOne({ _id: AdminId, role: "Admin" });
    if (!admin)
      return res.status(401).json({ message: "You are not authorized" });
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "something wrong" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const Id = req.params.id;
  try {
    const employee = await Employee.findByIdAndRemove(Id);
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json({ message: "Unable to delete employee" });
  }
};

exports.editEmployeeDetails = async (req, res) => {
  const { Name, Email, Phone, Role, AdminId, Id } = req.body;
  try {
    const employee = await Employee.findById(Id);
    (employee.name = Name),
      (employee.email = Email),
      (employee.phone = Phone),
      (employee.role = Role);
    await employee.save();
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json({ message: "unable to Edit Employee" });
  }
};

exports.getAllManagers = async (req, res) => {
  try {
    const Managers = await Employee.find({ role: "Manager" });
    res.status(200).json(Managers);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const Users = await Guest.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(400).json(err);
  }
};
