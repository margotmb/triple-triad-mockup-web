const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'user-info' });
 
module.exports = mongoose.model("User", userSchema);