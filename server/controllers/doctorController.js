const asyncHandler = require("express-async-handler");
const Doctor = require("../modules/doctorModel");

// Register a new doctor
const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, specialty, phoneNumber, experience, address } = req.body;

  if (!name || !email || !specialty || !phoneNumber || !experience || !address) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if doctor already exists
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: "Doctor already exists with this email" });
  }

  // Create a new doctor instance
  const newDoctor = await Doctor.create({
    name,
    email,
    specialty,
    phoneNumber,
    experience,
    address
  });

  res.status(201).json({
    message: "Doctor registered successfully",
    doctor: newDoctor
  });
});

module.exports = { registerDoctor };