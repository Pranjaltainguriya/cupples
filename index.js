const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Model = require("./model");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // ✅ Fix: Add JSON parser
app.use(express.urlencoded({ extended: true }));

// Start server
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
//mongodb://127.0.0.1:27017/wishes
// Database Connection
const databaseConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://pranjalsharma2816:dgZftFoGERjn9J1n@cluster0.fqxwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};
databaseConnection();

// Routes
//pranjalsharma2816
//dgZftFoGERjn9J1n
app.get("/", (req, res) => {
    console.log("hiii");
    res.send("Hello from the backend!");
});

app.post("/name", async (req, res) => {
    const { name, message } = req.body;

    try {
        if (!name || !message) {
            return res.status(400).json({ error: "Please enter name and message" }); // ✅ Fix: Use 400 status
        }

        const newMember = new Model({ name, message });
        await newMember.save();
        console.log(newMember)

        res.status(201).json({ _id: newMember._id, name: newMember.name, message: newMember.message });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get("/contant/:id" , async(req,res)=>{
    console.log("geting request")
const {id}=req.params

const data= await Model.findById(id);
if(!data){
console.log("data does' find")

}
res.json(data)
})
app.get("/hack", async (req,res)=>{
    console.log("hacking")
  const alllisting=  await Model.find({})
    res.send(alllisting)

})