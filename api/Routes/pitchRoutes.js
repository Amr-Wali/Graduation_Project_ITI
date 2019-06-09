let express=require("express"),
    pitchRouter=express.Router();
    mongoose=require("mongoose");

    require("./../Models/pitch.model");
    require("./../Models/owner.model");
   let Pitch= mongoose.model("pitch");
   let ownerSchema=mongoose.model("owner");

    pitchRouter.get("/add",(request,response)=>{

        ownerSchema.find({},(error,result)=>{
            response.render("pitch/addpitch",{owner:result});
        });
    
    });//add get
    pitchRouter.post("/add",(request,response)=>{
       
        let pitch=new pitchSchema({
         
            name:request.body.name,
            img:request.body.img,
            location:request.body.location,
            owner:request.body.owner
            
        });
    
        event.save((error)=>{
            if(!error)
            
            response.redirect("/pitch/list");
            else
            console.log("save event error "+error);
        });
    })
    module.exports=pitchRouter;