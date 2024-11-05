const axios = require('axios');
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const config = require('./config');
const endpoint = require('./endpoint,');

const createWindow = () => {
    const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { preload: path.join(__dirname, 'preload.js'), nodeIntegration: true, contextIsolation: false } })
    win.loadFile('./page/login.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

ipcMain.on('on-login', async (event, payload) => {
    const { username, password } = payload
    try {
        const response = await axios.post(config.url + endpoint.login, {
            username: username,
            password: password
        })
        if (response.data.success) {
            const token = response.data.data
            event.sender.send('login-success', token)
        }
    } catch (error) {
        event.sender.send('login-failed', error.response.data.message)
    }
})