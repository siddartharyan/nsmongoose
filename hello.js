const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost/school").then(() => console.log('connected to MongoDb')).catch((err) => console.log('exception', err));
app.use(express.json());

/**  
 * @schema will create a structure 
 * of the document stored in the MongoDB
 */
const schema = new mongoose.Schema({
    name: String,
    age: Number,
    course: [String]
});

/**
 * @Student is used the class and by using
 * this we can create the instances of 
 * the document.
 */


const Student = mongoose.model('student', schema);


app.post("/school/add", (req, res) => {
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    })
    student.save().then((student) => res.send(student));
})


app.get("/school/students", (req, res) => {
    Student.find({ course: 'angular' }).then((students) => res.send(students));
})


app.delete("/school/student/:id", (req, res) => {
    const id = req.params.id;
    Student.findByIdAndDelete(id).then(result => {
        if (!result) {
            res.status(404).send('Student not found');
            return;
        }
        res.send(result);
    })
})


app.patch("/school/student/:id", (req, res) => {
    const id = req.params.id;
    Student.findByIdAndUpdate(id, req.body, { new: true }).then((result) => {
        if (!result) {
            res.status(404).send('Student not found');
            return;
        }
        res.send(result);
    })
})