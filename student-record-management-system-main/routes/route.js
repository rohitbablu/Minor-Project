const express = require("express");
const dotenv = require("dotenv");
// const { default: mongoose } = require("mongoose");
const { Student } = require("../model/db.model");
const dbConnect = require("../model/db.connection");

const router = express.Router();
dotenv.config({
  path: ".env",
})

// mongoose.connect(process.env.MONGODB_URI, { dbName: "student_record_management" })
//   .then(() => console.log("Connected to MongoDB."))
//   .catch(err => console.error("MongoDB connection failed:", err));


// router.get("/", (req, res) => {
//   res.status(200).json({
//     "message": "Server started.",
//     "status": 200
//   })
// })

router.get("/students", async (req, res) => {
  await dbConnect();
  const allStudents = await Student.find(); // returns an array
  res.status(200).json({
    data: allStudents,
    status: 200
  });
});

router.put("/student/:id", async (req, res) => {
  await dbConnect();
  const { id } = req.params;
  const { name, course, age, city } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update fields
    student.name = name ?? student.name;
    student.course = course ?? student.course;
    student.age = age ?? student.age;
    student.city = city ?? student.city;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/student/:id", async (req, res) => {
  await dbConnect();
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.deleteOne();
    res.status(200).json({ message: "Student deleted successfully", _id: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/add/student", async (req, res) => {
  await dbConnect();

  const { name, course, age, city } = req.body;

  try {

    if (!name || !course || !age || !city) {
      return res.status(400).json({
        message: "All fields are required.",
        status: 400
      });
    }

    const student = await Student.create({ name, course, age, city });
    res.status(201).json({ data: student, status: 201, message: "New student created." });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      "message": "Server error.",
      "status": 500
    })
  }

})



module.exports = router;