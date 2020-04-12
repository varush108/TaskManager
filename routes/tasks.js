const { Router } = require('express')
const { Tasks } = require('../db')
const { Notes } = require('../db')

const route = Router()

route.get('/', async(req, res) => {

    const tasks = await Tasks.findAll()
    let response = []
    for (let task of tasks) {

        let notes = await Notes.findAll({ where: { taskId: task.dataValues.id } })
        task.dataValues.notes = notes

    }
    res.send(tasks)
})

route.get('/:id', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'task id must be an integer',
        })
    }

    let task = await Tasks.findByPk(req.params.id)
    let notes = await Notes.findAll({ where: { taskId: task.dataValues.id } })
    task.dataValues.notes = notes

    if (!task) {
        return res.status(404).send({
            error: 'No task found with id = ' + req.params.id,
        })
    }
    res.send(task)
})

route.post('/', async(req, res) => {
    if (typeof req.body.task !== 'string') {
        return res.status(400).send({ error: 'Task name not provided' })
    }
    if (req.body.done === 'true') {
        req.body.done = true
    } else {
        req.body.done = false
    }

    const newTodo = await Todos.create({
        task: req.body.task,
        done: req.body.done,
        due: req.body.due,
    })

    res.status(201).send({ success: 'New task added', data: newTodo })
})

module.exports = route