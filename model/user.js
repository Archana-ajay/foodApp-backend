const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^[0-9]{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid 10-digit phone number!`
        },
      },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    cart: {
        items: [
          {
            foodId: {
              type: mongoose.Types.ObjectId,
              ref: 'Food',
              required: true
            },
            quantity: { type: Number, required: true }
          }
        ]
      }
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};
UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.userName },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

module.exports = mongoose.model('User', UserSchema);