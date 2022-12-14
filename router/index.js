const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const collegeController = require('../controllers/collegeController')
router.get("/", (req, res) => res.send("Hello World"));
router.get('/user', (req, res) => res.send("hello world"));
router.post('/sign-up', userController.signUpUser)
router.put('/update-student/:id', userController.updateStudent);
router.post('/login-data', userController.signInUser)
router.post('/login-college', collegeController.signInUser)
router.post('/college-data', collegeController.addCollege)
router.get('/getStudent', userController.getData)
router.post('/getStudentByCollege', userController.getDataByCollege)

router.delete('/student/:deleteId', userController.deleteProduct)
router.get('/getDataById/:id', userController.getDataById)
router.post('/getStudentBySearch', userController.getStudentBySearch)
router.get('/getCollegeData', collegeController.getCollegeData)
router.post('/send-Mail', userController.sendMail);
// router.get('/', userController);
module.exports = router;