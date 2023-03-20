const express= require("express");
const { connection } = require("./Config/db");
const { postRouter } = require("./Routes/post.routes")
const app= express();

const cors= require("cors");

app.use(cors({
    origin : "*"
}))

app.use(express.json());

require("dotenv").config();

app.get("/", (req, res)=>{
    res.send("Welcome to Post");
})


app.use("/post", postRouter);


app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("Connected to database")
    }
    catch(err){
        console.log(err)
        console.log("Error while connecting to DB")
    }
    console.log(`Running on port ${process.env.PORT}`)
});