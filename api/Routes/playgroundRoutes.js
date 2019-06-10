let express = require("express"),
    multer = require("multer");

let playgroundRoutes = express.Router();
let playgroundSchema = require("../Models/playground.model");
let appointmentSchema = require("../Models/appointment.model");

const upload = multer({ dest: 'uploads' });

playgroundRoutes.post("", (req, res, next) => {
    let playground = new playgroundSchema({
        name: req.body.name,
        owner: req._id
    });
    playground.save((err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    })
})

// Get all playgrounds
playgroundRoutes.get("", (req, res, next) => {
    playgroundSchema.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
})

// Get all playgrounds for current owner
playgroundRoutes.get("/owner", (req, res, next) => {
    playgroundSchema.find({ owner: req._id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
})

playgroundRoutes.delete("/:id", (req, res, next) => {
    playgroundSchema.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            appointmentSchema.deleteMany({ playground: req.params.id }, err => {
                if (err) {
                    return next(err);
                }
            })
            res.status(200).send({ msg: "Deleted Successfully" });
        }
    });
})


module.exports = playgroundRoutes;
