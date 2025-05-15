const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    patientID : { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    username : { type: String , required : true, unique: true},
    password : {type : String , required: true}
});

module.exports = mongoose.model('Credential', credentialSchema)