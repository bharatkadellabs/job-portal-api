const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');
const { User } = require('../model/userSchema');
const getData = async (req, res) => {
    const studentData = await User.find();
    console.log(studentData)
    return res.status(201).json(studentData);
}
const signUpUser = async (req, res) => {

    const { name, email, mobile, aadharId, percentage, graduation, interested, collegeID, age, enrolYear, highSchool,
        address, fatherName, motherName, pincode, backlogs, languages } = req.body;
    const emailExsting = await User.findOne({ email: email })
    if (!emailExsting) {
        try {
            let userData;
            userData = new User({
                name,
                aadharId,
                email, mobile, percentage, interested, graduation, collegeID, age, enrolYear, highSchool,
                address, fatherName, motherName, pincode, backlogs, languages
            })
            await userData.save();
            if (!userData) {
                return res.status(406).json({ message: "Unable To Add Student Data" })
            }
            return res.status(201).json({ message: "Succesfully Registration.." })
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }
    if (emailExsting) {
        return res.status(406).json({ message: "User already exists." })
    }
}
const signInUser = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email })
    if (findUser) {
        if (findUser.password == password) {
            return res.status(201).json({ message: "login sucess", findUser });
        } else {
            return res.json({
                message: "Please Login Again! With Correct Email & Password..",
            });
        }
    } else {
        return res.status(405).json({ message: "User Not Register" });
    }
}
const deleteProduct = async (req, res, next) => {
    const id = req.params.deleteId;
    console.log(id);
    let data;
    try {
        data = await User.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!data) {
        return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Student Successfully Deleted" });
};
const getDataById = async (req, res) => {

    const id = req.params.id;
    console.log(id);
    let student;
    try {

        student = await User.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!student) {
        return res.status(404).json({ message: "No Product Id Found" });
    }
    return res.status(200).json({ student });
}
const updateStudent = async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id)
    const { name, email, mobile, aadharId, percentage, graduation, interested, collegeID } = req.body;
    let student;
    try {
        student = await User.findByIdAndUpdate(id, {
            name, email, mobile, aadharId, percentage, graduation, interested, collegeID
        })
        student = await student.save()

    } catch (err) {
        return res.status(400).json({ message: 'unable to Update by this id' })

    }
    if (!student) {
        return res.status(400).json({ message: 'unable to Update by this id' })
    }
    return res.status(200).json({ message: 'Update Succesfully', student });
};
const getStudentBySearch = async (req, res) => {
    console.log('body', req.body)
    const { search, colleges, courses, percentage } = req.body
    const regex = new RegExp(search, "i");
    console.log('red', regex)
    let Query = [{ name: regex }]
    if (colleges.length !== 0) {
        Query.push({ collegeID: { $in: colleges } })
    }
    if (courses.length !== 0) {
        Query.push({ graduation: { $in: courses } })
    }
    Query.push({ percentage: { $gt: percentage } })
    // console.log('first', Query)
    // Query = { $and: [{ collegeID: { $in: collegeNameFilterValue } }, { percentage: { $gt: percentageFilterValue } }, { graduation: { $in: courseFilterValue } }] }
    try {
        await User
            .find({ $and: Query })
            // .find({ $and: Query })
            .then((result) => {
                // console.log(result)
                return res.status(200).json({ message: "data fetched succesfully", data: result });
            })
    } catch (error) {
        return res.status(500).json({ message: "Something went Wrong", describe: error });

    }


}
exports.updateStudent = updateStudent;
exports.deleteProduct = deleteProduct;
exports.signUpUser = signUpUser;
exports.signInUser = signInUser;
exports.getData = getData;
exports.getDataById = getDataById;
exports.getStudentBySearch = getStudentBySearch;