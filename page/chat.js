const onloadChatPage = () => {
    const headerDiv = document.getElementById('username')

    const token = sessionStorage.getItem('jwt')
    const user = parseJwt(token)

    console.log(user)
    
    const h1 = document.createElement('h1')
    h1.textContent = user.username

    headerDiv.appendChild(h1)
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.onload = onloadChatPage