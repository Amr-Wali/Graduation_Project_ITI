let express=require("express"),
    pitchRouter=express.Router(),
    mongoose=require("mongoose"),
    upload = require("../server").upload;

    require("./../Models/pitch.model");
    require("./../Models/owner.model");
   let Pitch= mongoose.model("pitch");
   let PitchPhotos= mongoose.model("pitch_photos");
   let ownerSchema=mongoose.model("owner");

    pitchRouter.get("/add",(request,response)=>{

        ownerSchema.find({},(error,result)=>{
            response.render("pitch/addpitch",{owner:result});
        });
    
    });//add get
    pitchRouter.post("/add", upload.array("playgrounds", 5), (request,response)=>{

        let pitch=new Pitch({
            name:request.body.name,
            location:request.body.location,
            owner:request.body.owner
        });
    
        pitch.save((error)=>{
            if(err)
                console.log("save pitch error "+error);
            else {
                let images = request.files.map((img)=>{
                    return {filename: img.filename, pitch: pitch._id};
                });

                PitchPhotos.insertMany(images)
                .then(()=>{
                    response.redirect("/pitch/list");
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
            
        });
    })
    module.exports=pitchRouter;