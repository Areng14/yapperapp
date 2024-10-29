const { ipcRenderer } = require('electron')

function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const statusbar = document.getElementById('statusbar')
    if ( username && password) {
        statusbar.innerText = ""
        ipcRenderer.send('on_login',{username, password})
    } else {
        statusbar.innerText = "Username and password cannot be empty."
    }
}

ipcRenderer.on('login_failed', (event, data) => {
    const statusbar = document.getElementById('statusbar')
    statusbar.innerText = data
})

ipcRenderer.on('login_OK', (event, token) => {
    sessionStorage.setItem('jwtToken', token)
    window.location = '../userlist/index.html'
})