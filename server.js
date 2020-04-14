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


        app.listen(process.env.PORT || 3000, function() {
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
        })
    })
    .catch((err) => {
        console.error(err)
    })