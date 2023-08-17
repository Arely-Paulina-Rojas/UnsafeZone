'use strict'
const mongoose = require('mongoose');
const userSchema = require('../models/user.model');

userSchema.statics = {
    readAll: function () {// Obtener todos los registros
        return this.find().exec()
    }, 
    read: function (id) {
        return this.findOne({
            _id: id           
        }).exec()
    },
    getUserPerEmail: function (email){
        return this.findOne({
            email: email           
        }).exec()
    }, 
    auth: function (token){
        return this.findOne({
            token: token         
        }).exec()
    },
    create: function (data){
        const user = new this(data);
        return user.save();
    },
    update: function (id, data){
        return this.findOneAndUpdate({
            _id: id
        }, data, {
            new: true
        }).exec()
    },
    addToken: function (id, token){
        return this.findOneAndUpdate({
            _id: id
        }, {
            token: token
        }, {
            new: true
        }).exec()
    },
    delete: function (id){
        return this.findByIdAndDelete({
            _id: id
        }).exec()
    }
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;