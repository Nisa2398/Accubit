const user = require('../models/usermodel').user;
const transaction = require('../models/transactionmodel').transaction;
const nodemailer = require('nodemailer');
const mqservice = require('../services/mqservice');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
exports.addUser = async (req, res, next) => {
  try {
    const {firstName, lastName, email, age} = req.body;
    user
      .create({
        firstname: firstName,
        lastname: lastName,
        email: email,
        age: age,
      })
      .then((result) => {
        res.status(200).json({result: result});
      })
      .catch((err) => {
        res.status(500).json({error: err});
      });
  } catch (err) {
    res.status(500).json({error: err});
  }
};
exports.msg = async (req, res, next) => {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).send("No files were uploaded.");
    // }
    let q = 'sendmail';
    var  mg=[]
    upload.then(async (result1) => {
      var finalresult = new Promise((resolve, reject) => {
        result1.forEach(async (value, index) => {
          if (value.status == true) {
            let pub=await mqservice.publishToQueue(q, JSON.stringify(value.row))
            
            // mg.push({'pub':pub,'msg':msg})
            // console.log(pub)
            resolve(pub);
            // resolve();
          } else {
            resolve(false);
          }
        });
      });
      await finalresult.then(async (resp) => {
        // console.log(resp)
        var consumemsg
        if (resp) {
           consumemsg = new Promise((resolve, reject) => {
            resolve(mqservice.consume(q));
          });
        } else {
          return res.status(200).json({'message-sent': false});
        }
        consumemsg.then(async (rep) => {
          var mailmg=[]
          var mailer = new Promise((resolve, reject) => {
          rep.forEach(async(value,index)=>{
            
            transaction.create({
              email:JSON.parse(value).email,
              newslettername:JSON.parse(value).content,
              date:new Date().toISOString()
            }).then(async res=>{
              // console.log(res);
              resolve( await mail(JSON.parse(value)))
            })
           
          
          })
        })
         
        mailer.then((finalmail)=>{
          
          if(finalmail){
            mg.push(finalmail)
          }
          else{
            mqservice.publishToQueue(q, JSON.stringify(value.row))
          }
          res.status(200).json({'message-sent': mg});
        })
        });
    });
    
    });
  } catch (error) {
    console.log(error)
    res.status(200).json({error: error});
  }
};

const upload = new Promise((resolve, reject) => {
  // console.log(files)
  var output = [];
  fs.createReadStream(
    path.join(path.dirname(__dirname), '/uploads/newsletter.csv')
  )
    .pipe(csv())
    .on('data', async (row) => {
      // console.log(row);
      await user
        .findAll({
          where: {email: row.email},
        })
        .then(async (result) => {
          if (result[0]) {
            result = JSON.parse(JSON.stringify(result));
            row.content =
              row.content +
              ' ' +
              `${result[0].firstname}` +
              ' ' +
              `${result[0].lastname}`;

            output.push({status: true, row: row});
          } else {
            output.push({status: false, email: row.email});
            // resolve(output);
          }
        });
    });

  resolve(output);
});

async function mail(row) {
  let testAccount = await nodemailer.createTestAccount();
  // console.log(testAccount);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  // console.log(row.email)
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: testAccount.user, // sender address
    to: row.email, // list of receivers
    subject: row.newsletter, // Subject line
    text: row.content, // plain text body
    html: '<b>Hello world?</b>', // html body
  });
  return 'Message sent: %s', info.messageId;
}
