const { default: axios } = require('axios');
const { ipcRenderer } = require('electron');
const config = require('../../config');
const endpoint = require('../../endpoints');

async function fetchUserList() {
    const token = sessionStorage.getItem('jwtToken')
    if (!token) {
        window.location = '../login/index.html'
        return;
    }

    try {
        const response = await axios.get(`${config.url}${endpoint.users}`,{headers:{
            Authorization: token
        }})

        if (response.data.success) {
            const users = response.data.data
            const userListUl = document.getElementById('userList')

            users.forEach(user => {
               const li = document.createElement('li')
               li.textContent = user.username

               const chatButton = document.createElement('button')
               chatButton.textContent = '💬'
               chatButton.onclick = () => console.log(`User tried to chat with ${user.userID}`)

               li.appendChild(chatButton)
               userListUl.appendChild(li)
            });
        }
    } catch (error) {
        alert(error)
    }
}

window.onload = fetchUserList;