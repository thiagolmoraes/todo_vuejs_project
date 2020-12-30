const mongoose = require("mongoose")
const crypto = require("crypto")


//Schemas

const UserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String
})

UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);

}

UserSchema.methods.validPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
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