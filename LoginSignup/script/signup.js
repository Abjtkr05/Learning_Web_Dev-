if(localStorage.getItem('token')){
    window.location.href = 'index.html'
}


let username = document.getElementById('username')
let phone = document.getElementById('phone')
let email = document.getElementById('email')
let password = document.getElementById('password')
let button = document.getElementById('signup')
let error = document.getElementById('error')
button.addEventListener('click', signup)

function signup() {
    error.innerText = ""
    let arr = [];
    arr.push(username.value)
    arr.push(phone.value)
    arr.push(password.value)
    arr.push(email.value)
    if (valid(arr)) {
        let R = new XMLHttpRequest();
        R.open('POST', `https://foodbukka.herokuapp.com/api/v1/auth/register`)
        let body = {
            "username": username.value,
            "password": password.value,
            "phoneNumber": phone.value,
            "email": email.value
        }
        R.setRequestHeader("Content-Type", "application/json")
        R.send(JSON.stringify(body))
        R.addEventListener('load', () => {
            let response = JSON.parse(R.responseText);
            console.log(response)
            if (R.status != 200) {
                showError(response)
            } else {
                localStorage.setItem("token", response.token);
                window.location = "index.html"
            }
        })
    } else {
        error.innerText = "Please fill all the values"
    }
}

function valid(arr) {
    return arr.every(function (val) {
        return val != ""
    })
}
function showError(response){
    error.innerText = response.error;
}

