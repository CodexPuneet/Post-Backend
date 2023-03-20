const mongoose= require("mongoose");

const postSchema= mongoose.Schema({
    Title: String,
    Description: String,
    Category: String,
    Date: Date
})

const postModel= mongoose.model("post", postSchema);

module.exports= {
    postModel
}