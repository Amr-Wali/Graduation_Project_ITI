const port = 3000;
const express = require("express"),
    path = require("path"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    multer = require('multer');
    userRoutes = require("./Routes/userRoutes");


const authenticate = require("./middleware/jwt");
const server = express();

mongoose.connect(
    "mongodb://localhost:27017/kora",
    { useNewUrlParser: true },
    error => {
        if (error) {
            console.log("DB Connection Error " + error);
        }
    }
);
let upload = multer({ dest: "./uploads/",
    rename: function (fieldname, filename) {
      return Date.now();//need to be modified
    },
   });

server.use(morgan("short"));
server.use(cors({ origin: true }));
server.use(bodyParser.json());

server.use("/user", userRoutes);

// Authentication midleware
server.use(authenticate);

server.get('/', upload.single("avatar") ,(req, res) => {
    console.log(req._id);
    req.file.filename
    res.send('Hello World!')
});

server.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

server.listen(port, () => {
    console.log(`I am Listening on port ${port}`);
});