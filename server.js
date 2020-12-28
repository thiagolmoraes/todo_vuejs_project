const express = require('express');
const app = express();
const path = require('path')
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { TodoTask } = require("./model")
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ConnectDB
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected DB")
})

//app.use(express.static(path.join(__dirname, './dist')))

//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, './build/index.html'));
//});


//CRUDs 
//--Save
app.post('/save', async(req, res) => {
    console.log(req.body)
    const dados = new TodoTask({
        task: req.body.task
    });

    try {
        await dados.save()
        res.send({ "status": 200, "mensagem": "Salvo com Sucesso" })
    } catch (error) {
        res.send({ "status": 400, "mensagem": "Ocorreu um erro durante o processo" })
    }
})

//--Read
app.get('/tasks', async(req, res) => {
    TodoTask.find({}, (err, task) => {
        res.send(task)
    })
})

//--Delete
app.post('/delete/:id', async(req, res) => {
    const id = req.body.id;
    TodoTask.findByIdAndDelete(id, err => {
        if (err) return res.send(500, err);
    })
})

app.listen(port, () => {
    console.log(`WebServer listening at ${port}`);
});