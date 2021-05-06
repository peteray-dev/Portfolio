const express = require('express')

const app = express()
const moongose = require('mongoose')
const contactRoute = require('./routes/contact.routes')
const ApiError = require('./utils/ApiError')
const cors = require('cors')
const nodemailer = require('nodemailer') 
require("dotenv").config();



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())


/**Contact message */
app.use('/contact', contactRoute )


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    secure:false,
    auth: {
      user: 'peteraydev@gmail.com',
      pass:  '08037264137'
    },
    tls: {
        rejectUnauthorized:false
    }
  });

  // verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
  app.post('/send', (req, res, next) => {
    console.log(req.body);
   
  
let mail = {
      from: req.body.email,
      to: 'peteraydev@gmail.com', 
      subject: `Message from ${req.body.email}: ${req.body.subject}`,
      text: `From: ${req.body.firstname} ${req.body.lastname},
      Email: ${req.body.email} 
      Message: ${req.body.message}`
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }

    //   res.render('contact', {msg:'message has been sent'})
    })
  })
  
  /**Download file */
  app.get('/download', (req, res, next)=>{
    const file = `${__dirname}/upload/PopoolaCV.pdf`
    res.download(file)
  })

  //----------------------------------------//

app.all('*' , (err, req, res, next)=>{
    next(new ApiError('oppppss, page not found', 404))
})

PORT = 5000


moongose.connect('mongodb://127.0.0.1:27017/contacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(()=>{
    console.log('Database connection successful', );
}).catch((err)=>{
console.log(err);
})
app.listen(PORT, ()=>{
    console.log(`the server is listenig to http://localhost:${PORT}`);
})