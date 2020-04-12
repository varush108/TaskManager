// let submit = document.getElementById('submit')
// submit.onclick = function() {
//     getTodos()
// }
let noteId = 0

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild
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

function setDate() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    let dueDate = document.getElementById('dueDate')
    dueDate.value = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + tomorrow.getDate()
}

async function getTodos() {
    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    console.log(todos)
    return todos
}

async function addNewTodoUrlEncoded(task, done, due) {
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `task=${task}&done=${done}&due=2020-04-05`
    })
}

async function addNewTodoJson(task, done) {
    const resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task, done, due: '2020-04-05' })
    })
}