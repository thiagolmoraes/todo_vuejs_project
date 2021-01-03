const mongoose = require('mongoose')
const { User } = require("./model")

mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => {})

const users = new User({
    username: "thiago",
    password: "123mudar"
});

// save the user to database
users.save((err) => {
    if (err) throw err;
});

// fetch the user and test password verification
// User.findOne({ username: 'thiago' }, function(err, user) {
//     if (err) throw err;
//     console.log(user);
//     // test a matching password
// user.comparePassword('123mudar', function(err, isMatch) {
//     if (err) throw err;
//     console.log('123mudar:', isMatch); // -&gt; Password123: true
// });

//     // test a failing password
//     user.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -&gt; 123Password: false
//     });
// });