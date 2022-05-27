const Express=require("express")
const  Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
var eventmode=Mongoose.model("events",
new Mongoose.Schema({
    name:String,
    date:String,
    venue:String,
    organiser:String,
    contact:String
}))
Mongoose.connect("mongodb+srv://mzcbook:807826@cluster0.2sbk9.mongodb.net/eventDb")
app.post("/api/eventdelete",(req,res)=>{
    var getId=req.body
    eventmode.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
})
app.post("/api/eventsearch",(req,res)=>
{
    var getdate=req.body
    eventmode.find(getdate,(error,data)=>{
        if(error)
    {
        res.send({"status":"error","data":error})
    }
    else
    {
      res.send({"status":"success","data":data})
    }
    })
})
app.post("/api/eventmanage",(req,res)=>{
    var getname=req.body.name
    var getdate=req.body.date
    var getvenue=req.body.venue 
    var getorganiser=req.body.organiser 
    var getcontact=req.body.contact
    data={"name":getname,"date":getdate,"venue":getvenue,"organiser":getorganiser,"contact":getcontact}
    let ev=new eventmode(data)
    ev.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
   
    })
})
app.get("/api/views",(req,res)=>{
    eventmode.find(
        (error,data)=>{
            if(error)
     {
         res.send({"status":"error","data":error})
     }
     else
     {
         res.send({"status":"success","data":data})
     }

            
        }
    )
})
app.listen(4000,()=>{
    console.log("server running")
})