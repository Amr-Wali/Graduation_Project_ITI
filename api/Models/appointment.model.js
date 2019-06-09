const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let appointmentSchema = mongoose.Schema({
    dateAndTime: { type: Date, required: "You didn't select your match time" },
    playground: { type: ObjectId, ref: "PlayGround", required: "PlayGround is required" },
    player: { type: ObjectId, ref: "User", required: "Player is required" }
})


appointmentSchema.index({ playground: 1, dateAndTime: 1 }, { unique: true });

appointmentSchema.path('dateAndTime').validate((value) => {
    return value > new Date()
}, "The appointment can not be scheduled in the past");

module.exports = mongoose.model('Appointment', appointmentSchema);