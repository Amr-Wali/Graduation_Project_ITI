const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let playgroundSchema = mongoose.Schema({
    name: { type: String, required: "name can't be empty" },
    owner: { type: ObjectId, ref: "User", required: "There must be owner for this playground" },
    mainImg: { type: String }
})



module.exports = mongoose.model('PlayGround', playgroundSchema);