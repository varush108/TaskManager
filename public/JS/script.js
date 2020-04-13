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