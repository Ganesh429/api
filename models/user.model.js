let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userSchema = new Schema({

    userName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
})
userSchema.pre('save', function(next) {
    next();
});

module.exports = mongoose.model('user', userSchema)