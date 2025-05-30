const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cron = require('node-cron');

const badgeSchema = new mongoose.Schema({
    badge_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true },
    claimed_at: { type: Date, required: true, default: Date.now }
});

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    full_name: {
        type: String,
        required: true,
        trim: true,
        default: function() {
            return `${this.first_name} ${this.last_name}`;
        }
    },
    handle: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: "Passionate about innovation, collaboration, and growth, I'm a proud member of the Refrut community."
    },
    profile_url: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    email_verified: {
        type: Boolean,
        default: false,
        required: true
    },
    email_subscribed: {
        type: Boolean,
        required: true,
        default: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
