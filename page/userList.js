const { default: axios } = require("axios");
const config = require("../config");
const endpoint = require("../endpoint,");

async function fetchUserList() {
    const token = sessionStorage.getItem('jwtToken')

    if (!token){
        alert('User is not authenticated.')
        window.location = 'login.html'
        return;
    }

    try {
        const response = await axios.get(`${config.url}${endpoint.users}`, { headers:{
            Authorization: token
        }})

        if (response.data.success){
            const users = response.data.data
            const userListUl = document.getElementById('userList')

            users.forEach(user => {
                const li = document.createElement('li')
                li.textContent = user.username;

                const chatButton = document.createElement('button')
                chatButton.textContent = 'Chat';
                chatButton.onclick = () => window.location = 'chat.html'

                li.appendChild(chatButton)
                userListUl.appendChild(li)
            });
        }
    } catch (error) {
        if (error.response.status == 401){
            alert("User is not authenticated.")
        }
    }
} 

window.onload = fetchUserList;