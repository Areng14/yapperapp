const axios = require('axios');
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const endpoint = require('./endpoints');
const config = require('./config')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 512,
        height: 1024,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile('./pages/login/index.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin"){
        app.quit()
    }
})

ipcMain.on('on_login', async (event, payload) => {
    const { username, password } = payload

    try {
        const response = await axios.post(config.url + endpoint.login, {
            username : username,
            password : password
        })
        if (response.data.success) {
            const token = response.data.data
            event.sender.send('login_OK', token)

        }
    } catch (error) {
        event.sender.send('login_failed', error.response.data.message)
    }
})