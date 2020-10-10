const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a pozitive number')
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('It is not email')
            }
        },
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
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// token function

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'mysecret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// login operation

UserSchema.statics.findByCredentials = async (email, password) => {
    const User = this
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// crpyt operation before every user save if password changes.

UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

module.exports = UserSchema
