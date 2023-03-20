const express= require("express");
const { postModel } = require("../Model/Post.modal");
const postRouter= express.Router();

postRouter.get("/", async(req, res)=>{
    try {
        const data= await postModel.find();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch User data")
    }
})

postRouter.post("/create", async(req, res)=>{
    let task=req.body;
    try {
        const data= new postModel(task);
        await data.save()
        res.send("Added task Sucessfully")
    } catch (error) {
        console.log(error);
        res.send("Unable to Add task")
    }
})


postRouter.patch("/:id", async(req, res)=>{
    const data= req.body;
    const id= req.params.id;
    try {
      await postModel.findByIdAndUpdate({_id:id}, data);
        res.send("Updated task");
    } catch (error) {
        console.log(error);
        res.send("Unable to update")
    }
})

postRouter.delete("/:id", async(req, res)=>{
    const id= req.params.id;
    try {
        await postModel.findByIdAndDelete({_id:id});
        res.send("Deleted Task");
    } catch (error) {
        console.log(error);
        res.send("Unable to delete")
    }
})

postRouter.get('/sort',async (req, res) => {
    const order = req.query.order
    console.log(order)
 try {
   let data = await postModel.find().sort({Date:order})
   res.send(data)
 } catch (err) {
   res.send("Something went wrong");
   console.log(err);
 }
});


postRouter.get("/search/:search", async (req, res) => {
    let search = req.params.search;
    try {
      let data = await postModel.find({
        Title : { $regex: search, $options: "i" },
      });
      res.send(data);
    } catch (err) {
      res.send("something went wrong");
    }
  });



module.exports= {
    postRouter
}