const { ipcRenderer } = require('electron')

function login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if ( username && password ){
        ipcRenderer.send('on-login', {username, password})
    }else{
        const pTag = document.createElement('p')
        const textNode = document.createTextNode("Usernamd and password is required.")
        pTag.appendChild(textNode)
        pTag.style.color = 'red'
        const element = document.getElementById('login-form')
        element.appendChild(pTag)
    }
}

ipcRenderer.on('login-failed', (event, data) => {
    console.log(data)
    const pTag = document.createElement('p')
    const textNode = document.createTextNode(data)
    pTag.appendChild(textNode)
    pTag.style.color = 'red'
    const element = document.getElementById('login-form')
    element.appendChild(pTag)
})