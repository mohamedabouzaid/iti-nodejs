
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const doctorSchema  = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    rate:Number,
    evaluation:Number,
    specialty:String,
    location:String,
    price:Number,
    waiting:Number,
    phone:Number
  });
  doctorSchema.pre('save', async function(next) {
    const saltRounds = 10;
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  module.exports = doctorSchema ;