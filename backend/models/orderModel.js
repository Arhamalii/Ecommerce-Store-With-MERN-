const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "product",
    },
  ],
  payment:{},
  buyer:{
    type :mongoose.ObjectId,
    ref: "users",
  },
  status:{
    type:String,
    default:"Not Process",
    // enum:["not_process", "processing", "shiped","delivered","cancel"],
  }
},
{timestamps:true}
);

module.exports = mongoose.model("order", orderSchema);
