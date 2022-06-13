const mongoose = require("mongoose");
const {Schema,model} = require("mongoose")

const connection = mongoose.connect(`mongodb://localhost:27017/NEWS`);
const NewsSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String},
  Date:Date,
  Author:{type: String, enum: ["Mathias Newburn","Rey Rutty", "Magdaia Shellard", "Kathrine" ]},
  Location:String,
  tags:{ type:String,enum:["politics", "crime", "tech", "sports", "health"]},
  total_views:Number,
  category:{type: String, enum: ["trending", "top", "new"]}
});
const News =model("News",NewsSchema);
module.exports ={News,connection}