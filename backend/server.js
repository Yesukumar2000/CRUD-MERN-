// step1: import libraries
let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");

// step 2: initialize the express app
let app = express();

// step3: configure middleware
app.use(express.json());
app.use(cors());

//step 4: connect to mongoDB
let connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/studentDB");
    //  await mongoose.connect("mongodb+srv://kumaryesu2000:dbpassword@cluster0.ey7ty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    console.log("Successfully Connected To MongoDB");
  } catch (error) {
    console.log("unable to connect the connectToMongoDB", error);
  }
};

// step 5: define schema
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  mobileNo: Number,
  gender: String,
});

//  step 6: define model(use above schema)
let User = mongoose.model("users", userSchema);

// step 7: Respful api's
// post api
app.post("/students", async (req, res) => {
  try {
    let { firstName, lastName, age, gender, mobileNo } = req.body;
    let newStudent = new User({ firstName, lastName, age, gender, mobileNo });
    await newStudent.save();
    res.json({ status: "success", msg: "User created Successfully" });
  } catch (error) {
    console.log(error);
  }
});
//Get api
app.get("/students", async (req, res) => {
  try {
    let students = await User.find();
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});
//Get single student id api
app.get("/students/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let student = await User.findById(id);
    res.json(student);
  } catch (error) {
    console.log(error);
  }
});
//Update api
app.put("/update/students/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { firstName, lastName, age, gender, mobileNo } = req.body;
    await User.findByIdAndUpdate(id, { firstName, lastName, age, gender, mobileNo });
    res.json({ status: "Success", msg: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});
//Delete api
app.delete("/delete/student/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ status: "Success", msg: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
});
//  step8 : call connected mongo DB Function
connectToMongoDB();
//  step9: port listen
app.listen(9999, console.log("Listening the port number is 9999"));
