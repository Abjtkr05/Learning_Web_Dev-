let req = new XMLHttpRequest();
var authButton = document.getElementById("authButton");
let token = localStorage.getItem('token')
if(token) {
    req.open('GET', `https://cros-anywhere.herokuapp.com/https://foodbukka.herokuapp.com/api/v1/restaurant`)
    req.send()
    req.addEventListener('load', () => {
        console.log(typeof JSON.parse(req.response))
        let data = JSON.parse(req.response).Result
        data.forEach((info) => {
            let div = document.createElement('div')
            div.classList = 'restaurentContainer'

            let bussinessName = document.createElement('h2')
            bussinessName.innerText = info.businessname;
            let location = document.createElement('p')
            location.innerText = `Yoc Can Find This Restaurant at ${info.address}`
            let image = document.createElement('img')
            image.setAttribute('src', info.image)
            console.log(image)
            div.append(bussinessName)
            div.append(location)
            div.append(image)
            document.querySelector('body').append(div)
        })
    })
}

//login or logout


if (token) {
    authButton.innerText = 'Log Out'
} else {
    authButton.innerText = 'Log In'
}

authButton.addEventListener('click', function () {
    if (token) {
        logout()
    } else {
        window.location.href = 'login.html'
    }
})

function logout() {

    localStorage.removeItem("token");
    window.location.reload();
}