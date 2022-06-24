const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String, required: 'User Name is required',
    },
    title: {
        type: String,
    },
    fullName: {
        type: String, required: 'Full Name is required',
    },
    email: {
        type: String, trim: true,
    },
    Client: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Client',
    },
    password: {
        type: String, required: 'Your password is required',
    },
    resetPasswordToken: {
        type: String, required: false,
    },
    resetPasswordExpires: {
        type: Date, required: false,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    company: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    score: {
        type: Number,
        default: 0
    },
    overall_completion: {
        type: Number,
        default: 0
    },
    badges: {
        type: Array,
    },
    isActive: {
        type: Boolean, default: true,
    },
    pre_ass: {
        type: Boolean, 
        default: false,
    },
    createdOn: {
        type: Date, default: Date.now,
    },

    updatedOn: {
        type: Date,
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
}, {timestamps: true});
UserSchema.methods.comparePassword = function (password) {
    return password == this.password;
};
UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model('Users', UserSchema);
