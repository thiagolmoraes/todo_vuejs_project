const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { TodoTask, User } = require("./model")
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ConnectDB
mongoose.connect(`mongodb://localhost:27017/todo`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//app.use(express.static(path.join(__dirname, './dist')))

//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, './build/index.html'));
//});


//CRUDs 
//--Save
app.post('/save', async(req, res) => {
    try {
        const dados = new TodoTask({
            task: req.body.task
        });
        await dados.save()
        res.send({ "status": 200, "mensagem": "Salvo com Sucesso" })
    } catch (error) {
        console.log(`Error save ${error}`)
        res.send({ "status": 400, "mensagem": "Ocorreu um erro durante o processo" })
    }
})

//--Read
app.get('/tasks', async(req, res) => {
    try {
        TodoTask.find({}, (err, task) => {
            res.send(task)
        })
    } catch (error) {
        console.log(`Error list ${error}`)
    }
})

//--Login
app.post('/login', async(req, res) => {
    try {
        await User.findOne({ username: req.body.username }, function(err, user) {
            if (typeof user === 'object' && user !== null) {
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch) {
                        res.status(200).send({ user_ob: user })
                    } else {
                        res.status(400).send({ message: "Invalid Password" })
                    }
                })
            } else {
                res.status(401).send({ message: "User not found" })
            }
        })
    } catch (error) {
        res.send(`Error User ${error}`)
    }
})

//--Delete
app.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.body.id;
        TodoTask.findByIdAndDelete(id, err => {
            if (err) return res.send(500, err);
            res.send({ 'status': 200, "mensagem": 'Tarefa deletada' })
        })
    } catch (error) {
        console.log(`Error Delete ${error}`)
    }
})

//--Update
app.put('/edit/:id', async(req, res) => {
    try {
        console.log(req.params.id, req.body.task);
        TodoTask.findByIdAndUpdate(req.params.id, { task: req.body.task }, (err, docs) => {
            if (err) {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(`Error Update ${error}`)
    }
})

app.listen(port, () => {
    console.log(`WebServer listening at ${port}`);
});