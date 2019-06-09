let express = require("express"),
    mongoose = require("mongoose");

let playgroundRoutes = express.Router();
let playgroundSchema = require("../Models/playground.model");
let appointmentSchema = require("../Models/appointment.model");

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


playgroundRoutes.delete("/:id", (req, res, next) => {
    playgroundSchema.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send({ msg: "Deleted Successfully" });
        }
    });
})


module.exports = playgroundRoutes;
