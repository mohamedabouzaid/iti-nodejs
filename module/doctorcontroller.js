const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken');
const Doctor = require('./doctorModel');

const asyncSign = util.promisify(jwt.sign);

const secretKey=  "ksdwkjwncnjewfjwnewrnj";
const login = async (req,res,next)=>{
    const { username, password } = req.body;
    try {
        const doctor  = await Doctor.findOne({ username});
        if(!doctor)throw new Error('invalid username or password');
        const {password: hashedPassword} = doctor;
        const result = await bcrypt.compare(password, hashedPassword);
        if(!result) throw new Error('invalid username or password');
        const token = await asyncSign({
            id: doctor.id
        }, secretKey);

        res.send({token});
    } catch (error) {
        next(error);
    }
}

module.exports ={
    login
}