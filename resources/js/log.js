module.exports = {
    send: (data) => {
        let listItem = document.createElement('li');
        if (data.status == "ERROR") {
            listItem.setAttribute('class', 'error');
            listItem.textContent = "Error: " + data.content;
        } else {
            listItem.setAttribute('class', 'success');
            listItem.textContent = "Doc created: " + data.content;
        }

        document.getElementById("status").appendChild(listItem);
    }
}