let noteId = 0

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild
}

async function createTask(task) {
    let dueDate = new Date(task.due)
    let badge = "warning"
    let date = dueDate.getDate() + "/" + (dueDate.getMonth() + 1) + "/" + dueDate.getFullYear()

    let tasks = '<div class="card">'
    tasks += '<div class="card-header" id="heading' + task.id + '">'
    tasks += '<div style="float:left">'
    tasks += '<h2 class="mb-0">'

    tasks += '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse' + task.id + '"  aria-controls="collapseOne">'
    tasks += '' + task.title.toUpperCase() + ''
    let completed = ""
    let completedClass = ""
    if (task.completed) {
        completed = "completed"
        completedClass = "fa fa-check"
    }
    tasks += '<span class="' + completedClass + '" style="color: red;" id="completed' + task.id + '">' + completed + '</span>'
    tasks += '</button>'
    tasks += '</h2>'
    tasks += '</div>'
    tasks += '<div style="float:right">'

    if (task.priority == 'low') {
        badge = 'success'
    } else if (task.priority == 'high') {
        badge = 'danger'
    }
    tasks += '<h5 class="mb-0"> <span class="badge badge-' + badge + '" id="priority' + task.id + '">' + task.priority.toUpperCase() + ' PRIORITY</span></h5>'
    tasks += '<h5 class="mb-0"> <span class="badge badge-info" id="dueDate' + task.id + '">DUE ON ' + date + '</span></h5>'
    tasks += '</div>'
    tasks += '</div>'
    tasks += '<div id="collapse' + task.id + '" class="collapse" aria-labelledby="heading' + task.id + '" data-parent="#taskContainer">'
    tasks += '<div class="card-body">'
    tasks += '<div class="row">'
    tasks += '<div class="col-md-11">'
    tasks += '<h4 class="card-title">' + task.description + ''
    tasks += '</h4>'
    tasks += '</div>'

    tasks += '<div class="col-md-1">'
    tasks += '<button type="button" class="btn btn-primary" onclick="editTask(' + task.id + ')" > <span class="fa fa-pencil "></span> Edit</button>'
    tasks += '</div>'
    tasks += '</div>'
    tasks += '<hr>'
    tasks += '<div class="row" id="taskListContainer' + task.id + '">'
    tasks += '<ul class="list-group" id="ulTaskList' + task.id + '">'

    for (let note of task.notes) {
        tasks += '<li class="list-group-item " >' + note.text + '</li>'
    }
    tasks += '</ul>'
    tasks += '</div>'
    tasks += '<br>'
    tasks += '<h5>Add A NOTE : </h5>'
    tasks += '<div class="input-group mb-3">'
    tasks += '<input type="text" class="form-control" id="noteText' + task.id + '" placeholder="NOTE TEXT" >'
    tasks += '<div class="input-group-append">'
    tasks += '<button class="btn btn-primary" type="button" id="button-addon2" onclick="addNoteToTask(' + task.id + ')">ADD</button>'
    tasks += '</div>'
    tasks += '</div>'
    tasks += '</div>'
    tasks += '</div>'
    tasks += '</div>'
    let taskContainer = document.getElementById('taskContainer')
    taskContainer.append(htmlToElement(tasks))
}




function addNote() {
    let notesContainer = document.getElementById("notesContainer")

    noteId++
    let note = "<div class='form-row'  id='noteRow" + noteId + "'>"
    note += "<div class='form-group col-md-11'>"
    note += "<input type='text' required class='form-control' id='notes" + noteId + "' name='notes' placeholder='Notes'>"
    note += "</div>"
    note += "<div class='form-group col-md-1 close'>"
    note += '<button class="btn btn-link" onclick="closeNote(noteRow' + noteId + ')">'
    note += "<i class = 'fa fa-times-circle-o fa-2x'style = 'color:red' aria-hidden = 'true' ></i> "
    note += "</button>"
    note += "</div>"
    note += "</div>"
    noteHtml = htmlToElement(note)
    notesContainer.append(noteHtml)
}

function closeNote(noteRow) {
    console.log(noteRow)
    let notesContainer = document.getElementById("notesContainer")
    notesContainer.removeChild(noteRow)


}