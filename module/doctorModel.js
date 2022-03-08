const mongoose = require('mongoose');
const doctorSchema = require('./doctorSchema');
const doctor = mongoose.model('User',  doctorSchema);

module.exports = doctor;