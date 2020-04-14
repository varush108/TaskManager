getTasks().then(function(value) {

    for (let task of value) {
        createTask(task)
    }
})

window.onload =
    function setDate() {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        let dueDate = document.getElementById('dueDate')
        dueDate.value = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + tomorrow.getDate()
    }

async function addNewTask() {
    let values = document.getElementsByName('notes').values()
    let notes = []
    for (let note of values) {
        let noteJson = {}
        if (note.value != '') {
            noteJson.text = note.value
            notes.push(noteJson)
        }
    }

    let reqBody = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        priority: document.getElementById('priority').value,
        due: document.getElementById('dueDate').value,
        notes: notes
    }

    const resp = await addNewTaskJson(reqBody)

    if (resp.status == 201) {
        let response = await resp.json()
        response = JSON.parse(response)
        response.data.notes = response.notes
        console.log(response.notes)
        createTask(response.data)
        $('#taskAddedModal').modal('show')
    }



}

async function editTaskDetails() {
    let completed = false
    if (document.getElementById('completedEdit').checked) {
        completed = true
    }
    console.log("completed = " + completed)
    let reqBody = {
        priority: document.getElementById('priorityEdit').value,
        due: document.getElementById('dueDateEdit').value,
        completed: completed
    }

    const resp = await editTaskJson(reqBody, document.getElementById('taskIdEdit').value)

    if (resp.status == 202) {
        let dateValue = new Date(document.getElementById('dueDateEdit').value)
        let priority = document.getElementById('priorityEdit').value
        let date = dateValue.getDate() + "/" + (dateValue.getMonth() + 1) + "/" + dateValue.getFullYear()
        document.getElementById('dueDate' + document.getElementById('taskIdEdit').value).innerHTML = ""
        document.getElementById('dueDate' + document.getElementById('taskIdEdit').value).innerHTML = "DUE ON " + date
        document.getElementById('priority' + document.getElementById('taskIdEdit').value).innerHTML = ""
        document.getElementById('priority' + document.getElementById('taskIdEdit').value).innerHTML = priority.toUpperCase() + " PRIORITY"
        document.getElementById('priority' + document.getElementById('taskIdEdit').value).classList = ""
        let badge = "warning"
        if (priority == 'low') {
            badge = 'success'
        } else if (priority == 'high') {
            badge = 'danger'
        }
        document.getElementById('priority' + document.getElementById('taskIdEdit').value).classList = "badge badge-" + badge
        $('#editModal').modal('hide')
    } else {
        console.log(resp)
    }
}