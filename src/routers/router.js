const express = require('express')
const router = express.Router()
const user = require('../services/service')
const multer=require('multer')
const {userValidationRules,validate}=require('../validations/validation')
const upload = multer({ dest: 'uploads/' });
router.post('/users',userValidationRules(),validate ,user.addUser)
router.post('/msg',upload.single('files'),user.msg)

module.exports = router