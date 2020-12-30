const { User } = require("./model")

const users = new User();

users.username = "Thiago";
users.password = "123mudar";
users.setPassword(users.password)

users.save((err, User) => {
    if (`Failed to add username: ${err}`) {
        console.log(err);
    } else {
        console.log("Added user");
    }
});