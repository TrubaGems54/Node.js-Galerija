const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const imagesDir = path.join(__dirname, 'public', 'images');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        let date_ob = new Date();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        cb(null,hours + "-" + minutes + "-" + seconds  +  "-" +file.originalname)
    }
})
    
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb){

        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 

}).single("photo");       
  
app.get("/",function(req,res){
    res.render("Signup");
})
    
app.post("/upload",function (req, res, next) {
    upload(req,res,function(err) {
        if(err) {
            res.send(err)
        }
        else {
            res.send("Success, Image uploaded!")
        }
    })
},async (req,res) =>{
    res.status(200).json({
        message: "picture uploaded successfully"
    })
})
    
app.listen(8080,function(error) {
    if(error) throw error
        console.log("Server created Successfully on PORT 8080")
})