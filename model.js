const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//Schemas

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: { type: String, required: true }

})

UserSchema.pre('save', async function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });

};

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    // done: {
    //   type: Number,
    //    required: true
    // },
    date: {
        type: Date,
        default: Date.now
    }
})

const TodoTask = mongoose.model("TodoTask", TodoSchema)
const User = mongoose.model("User", UserSchema)

module.exports = { TodoTask, User }