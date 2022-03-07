const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const app = express()
// const upload = multer({dest: 'uploads/'})
const Application = require('./models/application')
require('./config/db');

//@middlewares
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, 'public')))

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };

//Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

// @routes
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});


app.post('/submit', upload.single('resume'), (req, res, next) => {
    console.log(req.body)
    const applicationData = new Application ({
        fullname:req.body.fullname,
        email:req.body.email,
        message: req.body.message,
        resume: req.file

    })

    applicationData.save()
        .then(data => {
            res.json(data);
        })
        .catch (err => {
            console.log(res.json({message:err}))
        });




});

const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log(`Magic happens on port ${port}`)
})

exports = module.exports = app;