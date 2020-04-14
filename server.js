const express = require('express')

const { db, Tasks } = require('./db')
const tasksRoute = require('./routes/tasks')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/tasks', tasksRoute)

db.sync()
    .then(() => {


        app.listen()
    })
    .catch((err) => {
        console.error(err)
    })