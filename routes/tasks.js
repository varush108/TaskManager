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
    if (typeof req.body.title !== 'string') {
        return res.status(400).send({ error: 'Task name not provided' })
    }

    if (typeof req.body.description !== 'string') {
        return res.status(400).send({ error: 'Task description not provided' })
    }


    if (isNaN(Date.parse(req.body.due))) {
        return res.status(400).send({ error: 'Task due date not provided' })
    }

    let priority = ['low', 'medium', 'high']
    if (!priority.includes(req.body.priority)) {
        return res.status(400).send({ error: 'Task priority not provided' })
    }

    const newTask = await Tasks.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        due: req.body.due
    })

    let noteinsert = []
    if (req.body.notes.length != 0) {
        let notes = req.body.notes
        for (let note of notes) {
            console.log("note = " + note)
            if (typeof note.text === 'string') {

                let note1 = await Notes.create({
                    text: note.text,
                    taskId: newTask.id
                })
                noteinsert.push(note1)
            }
        }
    }

    res.status(201).json(JSON.stringify({ success: 'New task added', data: newTask, notes: noteinsert }))
})

route.post('/:id/notes', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'task id must be an integer',
        })
    }
    let task = await Tasks.findByPk(req.params.id)
    if (!task) {
        return res.status(404).send({
            error: 'No task found with id = ' + req.params.id,
        })
    }
    if (typeof req.body.note !== 'string') {
        return res.status(400).send({ error: 'Note text not provided' })
    }

    let note = await Notes.create({
        text: req.body.note,
        taskId: task.id
    })

    res.status(201).send({ success: 'New note added to task ' + task.title, data: note })
})

route.patch('/:id', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'task id must be an integer',
        })
    }
    let task = await Tasks.findByPk(req.params.id)
    if (!task) {
        return res.status(404).send({
            error: 'No task found with id = ' + req.params.id,
        })
    }

    let priority = ['low', 'medium', 'high']
    if (!priority.includes(req.body.priority)) {
        return res.status(400).send({ error: 'Task priority not provided' })
    }

    if (isNaN(Date.parse(req.body.due))) {
        return res.status(400).send({ error: 'Task due date not provided' })
    }
    let completed = (req.body.completed === 'true')
    task.priority = req.body.priority
    task.completed = req.body.completed
    task.due = req.body.due

    await task.save()

    res.status(202).send({ success: 'Task details updated', newData: task })


})

module.exports = route