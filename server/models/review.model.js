const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    place: {type: Schema.ObjectId, ref: 'Place'},
    review: {type: String}, 
    score: {type: Number, required: true},
    image: {type: String}  
    },
    {
        timestamps: true
    }
);

module.exports = reviewSchema; 