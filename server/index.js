const express = require('express')

const app = express()
const moongose = require('mongoose')
const contactRoute = require('./routes/contact.routes')
const ApiError = require('./utils/ApiError')
const cors = require('cors')
const nodemailer = require('nodemailer') 
require("dotenv").config();
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

// const config = require('./configs')





app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, "views/build")))
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, "view", 'index.html'))
})
/**Contact message */
app.use('/contact', contactRoute )


const transporter = nodemailer.createTransport({
    host: process.env.SMTP, //replace with your email provider
    port: 587,
    secure:false,
    auth: {
      user: process.env.EMAIL,
      pass:  process.env.PASS
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
    console.log(process.env.EMAIL)
    
   
  
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

//--------------------------------------------//

// const configs = {
//   development: {
//     SERVER_URI: 'localhost:5000',
//   },
//   production: {
//     SERVER_URI: 'HEROKU_URI',
//   },
// };

// module.exports.config = configs[process.env.NODE_ENV]

//------------------------------------------//

const PORT = process.env.PORT || 5000

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