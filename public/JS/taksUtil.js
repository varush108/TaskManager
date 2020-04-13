async function getTasks() {
    const resp = await fetch('/tasks', { method: 'GET' })
    const todos = await resp.json()

    return todos
}
async function getTask(id) {
    const resp = await fetch('/tasks/' + id, { method: 'GET' })
    const todos = await resp.json()
    return todos

}

async function editTask(id) {
    let taskDetails = await getTask(id)
    let priority = document.getElementById('priorityEdit')
    let dueDate = document.getElementById('dueDateEdit')
    let completed = document.getElementById('completedEdit')
    priority.value = taskDetails.priority
    let today = new Date(taskDetails.due)
    dueDate.value = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate()
    if (taskDetails.completed == true) {
        completed.checked = true
    } else {
        completed.checked = false
    }

    $('#editModal').modal('show')

}

async function addNewTodoJson(task, done) {
    let reqBody = {
        title: 'task insert final',
        description: 'task description',
        priority: 'medium',
        due: '2020-09-20',
        notes: [{
                text: 'Note test'
            },
            {
                text: 'Note test 2',
            }
        ]
    }
    const resp = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })

    console.log(resp)
}