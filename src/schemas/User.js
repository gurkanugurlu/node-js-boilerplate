const mongoose = require('mongoose')
const validator = require('validator')
module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a pozitive number')
            }
        }
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('It is not email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 6,
        maxLength: 30,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Error creating password')
            }
        }
    }
})