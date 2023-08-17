const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placeSchema = new Schema({
    fullAddress: {type: String, required: true}, 
    street: {type: String},
    number: {type: String},
    suburb: {type: String, required: true},
    town: {type: String, required: true},
    state: {type: String, required: true},
    score: {type: Number, required: true},
    description: {type: String},
    picture: {type: String}

});

module.exports = placeSchema;
