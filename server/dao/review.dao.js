'use strict'
const mongoose = require('mongoose');
const reviewSchema = require('../models/review.model');

reviewSchema.statics = {
    readAll: function () {
        return this.find().exec()
    },
    read: function (id){
        return this.findOne({
            _id: id
        }).populate('user place').exec()
    },
    create: function (data) {
        const review = new this(data);
        return review.save();
    },
    update: function (id, data){
        return this.findOneAndUpdate({
            _id: id
        }, data, {
            new: true
        }).exec()
    },
    delete: function (id){
        return this.findByIdAndDelete({
            _id: id
        }).exec()
    },
    getPerPlace: function (place){
        return this.find({
            place: place
        }).populate('user place').exec()
    },
    getPerUser: function (user){
        return this.find({
            user: user
        }).populate('user place').exec()
    },
    addPicture: function (id, image){
        return this.findByIdAndUpdate({
            _id: id
        }, {
            image: image
        }, {
            new: true
        }).exec()
    }
};

const reviewModel = mongoose.model('Review', reviewSchema);
module.exports = reviewModel; 