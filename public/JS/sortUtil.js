function sortListByPriority() {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("taskContainer");
    switching = true;
    while (switching) {
        switching = false;
        let priorityList = ["LOW PRIORITY", "MEDIUM PRIORITY", "HIGH PRIORITY"]
        b = document.getElementsByClassName("card");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            let priority1 = priorityList.indexOf(b[i].getElementsByTagName("h5")[0].innerText)
            let priority2 = priorityList.indexOf(b[i + 1].getElementsByTagName("h5")[0].innerText)

            if (priority2 > priority1) {
                /* If next item is alphabetically lower than current item,
                 mark as a switch and break the loop: */
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark the switch as done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

function sortListByCompleted() {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("taskContainer");
    switching = true;

    while (switching) {

        switching = false;
        let priorityList = ["LOW PRIORITY", "MEDIUM PRIORITY", "HIGH PRIORITY"]
        b = document.getElementsByClassName("card");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            let priority1 = b[i].getElementsByTagName("span")[0].innerText
            let priority2 = b[i + 1].getElementsByTagName("span")[0].innerText

            if (priority2 < priority1) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

function sortListByDate(order) {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("taskContainer");
    switching = true;
    while (switching) {
        switching = false;
        b = document.getElementsByClassName("card");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            let from1 = b[i].getElementsByTagName("h5")[1].innerText.split("/")
            let from2 = b[i + 1].getElementsByTagName("h5")[1].innerText.split("/")
            let date1 = new Date(from1[2], ("0" + (from1[1] - 1)).slice(-2), from1[0].slice(7))
            let date2 = new Date(from2[2], ("0" + (from2[1] - 1)).slice(-2), from2[0].slice(7))

            if (dateOrder(order, date1, date2)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

function dateOrder(order, date1, date2) {

    if (order === 'asc') {
        return date2.getTime() < date1.getTime()
    } else {
        return date2.getTime() > date1.getTime()
    }
}