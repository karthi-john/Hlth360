const Patient = require('../models/Patient');
const mongoose = require('mongoose');

exports.getPatients = async (req, res, next) => {
  try {

    const filter = req.query;
    console.log(filter);
    const patients = await Patient.find(filter)
                .populate('prescribedProducts');
    
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    next(error);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid patient ID'
      });
    }
    
    const patient = await Patient.findById(id).populate('prescribedProducts');
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};


exports.createPatient = async (req, res, next) => {

    try{
        const newPatient = await Patient.create(req.body);
        
        const patient = await Patient.findById(newPatient._id).populate('prescribedProducts');
        res.status(201)
            .json({
                success : true,
                data : patient
            });
    } catch(error){
        next(error);
    }
}


exports.updatePatient = async (req, res, next) => {
    try{
        const id = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid patient ID'
        });
        }

        const patient = await Patient.findByIdAndUpdate(id, req.body, {new : true}).populate('prescribedProducts');

        if(!patient){
            return res.status(404).json({
                success: false,
                error: "Patient Not found"
            });
        }

        res.status(200).json({
            success : true,
            data: patient
        })
    } catch(error){
        next(error);
    }
}


exports.deletePatient = async (req, res, next) => {
    try{
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid patient ID'
        });
        }

        const patient = await Patient.findByIdAndDelete(id).populate('prescribedProducts');

        if(!patient){
            return res.status(404).json({
                success: false,
                error: "Patient Not found"
            });
        }

        res.status(200).json({
            success : true,
            data: patient
        });
    } catch(error){
        next(error);
    }
};
