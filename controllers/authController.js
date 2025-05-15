const Credential = require('../models/Credential');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');

exports.register = async(req, res, next) => {
    try{

        const { name, age, gender, contactNumber, username, password } = req.body;

        const user = await Credential.findOne({username: username});

       if (user) {
            throw new HttpError(`User already exists with the given username: ${username}`, 400);
        }


        const patient = new Patient({
            name,
            age,
            gender,
            contactNumber,
        });

        const newPatient = await patient.save();

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const credential = new Credential({
            patientID: newPatient._id,
            username,
            password: hashedPassword

        });

        const updatedCredential = await credential.save();

        res.status(201).json({
            success : true,
            data : 'Patient registered successfully'
        });

    }catch(error){
        next(error);
    }
};

exports.login = async(req, res, next) => {
    try{

        const { username, password} = req.body;

        const user = await Credential.findOne({username : username});
       
        if(!user)
            throw new HttpError("Invalid username or password", 400);

        const ismatch = await bcrypt.compare(password, user.password);

        if(!ismatch)
             throw new HttpError("Invalid username or password", 400);

        const token = jwt.sign(
            { userID: user._id, username: username},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        
        return res.status(200).json({
            success : true,
            data : "Logged in Successfully",
            token: token
        });

    }catch(error){
        next(error);
    }
}