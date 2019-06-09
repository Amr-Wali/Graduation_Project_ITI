let express = require("express"),
    mongoose = require("mongoose");

let appointmentRoutes = express.Router();
let appointmentSchema = require("../Models/appointment.model");

appointmentRoutes.post("", (req, res, next) => {
    let appointment = new appointmentSchema({
        dateAndTime: req.body.date,
        playground: req.body.playground,
        player: req._id
    });
    appointment.save((err, result) => {
        if (err) {
            if (err.code == 11000)
                res.status(422).send(['The playground already booked up at this time']);
            else
                return next(err);
        }
        else {
            res.status(200).send(result);
        }
    })
})

// List Player Matches
appointmentRoutes.get("", (req, res) => {
    appointmentSchema.find({ player: req._id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
});

// List PlayeGround Matches
appointmentRoutes.get("/playground", (req, res) => {
    appointmentSchema.find({ playground: req.body.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
});

appointmentRoutes.put("/:id", (req, res, next) => {
    appointmentSchema.update({ _id: req.params.id },
        { $set: { dateAndTime: req.body.date } },
        (err) => {
            if (err) {
                return next(err);
            }
            else {
                appointmentSchema.findById(req.params.id, (err, result) => {
                    console.log(result);
                    if (!err) {
                        res.status(200).send(result);
                    }
                    else {
                        return next(err);
                    }
                })
            }
        });
});

appointmentRoutes.delete("/:id", (req, res) => {
    appointmentSchema.deleteOne({ _id: req.params.id },
        (err, result) => {
            if (err) {
                return next(err);
            }
            else {
                res.status(200).send({ msg: "Deleted Successfully" });
            }
        });
});
module.exports = appointmentRoutes;
