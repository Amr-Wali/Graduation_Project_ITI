let mongoose=require("mongoose");

//1- create schema
let Pitch=new mongoose.Schema({
    name: {
        type: String,
        required: "name can't be empty"
    },
    owner:{
        type:Number,
        ref:"owner"
    },
    location:Number
});

let PitchPhotos = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    pitch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pitch"
    }

})

mongoose.model("pitch", Pitch );
mongoose.model("pitch_photos",PitchPhotos );