'use strict'
const mongoose = require('mongoose');
const placeSchema = require('../models/place.model');

placeSchema.statics = {
    readAll: function () {
        return this.find().exec()
    },
    read: function (id) {
        return this.findOne({
            _id: id
        }).exec()
    },
    findPlace: function (fullAddress) {
        return this.findOne({
            fullAddress: fullAddress
        }).exec()
    },
    create: function (data) {
        const place = new this(data);
        return place.save();
    }, 
    update: function (id, data){
        return this.findByIdAndUpdate({
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
    addPicture: function (id, picture){
        return this.findByIdAndUpdate({
            _id: id
        }, {
            picture: picture
        }, {
            new: true
        }).exec()
    }
};

const placeModel = mongoose.model('Place', placeSchema);
module.exports = placeModel;