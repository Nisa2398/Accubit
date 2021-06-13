const express = require('express')
const cors=require('cors')
const app=express()
const sequelize = require('./utils/database');
const fileUpload=require('express-fileupload')
const user=require('./routers/router')
const amp = require('./services/service').msg
const bodyParser = require('body-parser');
const multer = require('multer');
app.use(express.json())
app.use(express.urlencoded())

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, __dirname + '/uploads/')
	},
	filename: (req, file, cb) => {
	   cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});
 
const upload = multer({storage: storage});
app.use('/msg', upload.single("files"),amp)
app.use(bodyParser.urlencoded({extended: true}));
// app.use(amp)
 app.use(user)

 sequelize
 .sync()
 .then((result) => {
   app.listen(process.env.PORT);
   console.log("Client connected successfully");
 })
 .catch((err) => console.log(err));

  
  