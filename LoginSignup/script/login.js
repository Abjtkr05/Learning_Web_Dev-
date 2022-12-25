if(localStorage.getItem('token')){
    window.location.href = 'index.html'
}

let username = document.getElementById('username')
let password = document.getElementById('password')
let button = document.getElementById('login')
let error = document.getElementById('error')

button.addEventListener('click',login)
function login(event){
    button.innerText = 'Loading...'
    button.disabled = true
    let arr = []
    arr.push(username.value)
    arr.push(password.value)
    error.innerText = ""
    if(validate(arr)){
        let R = new XMLHttpRequest()
        R.open('POST',`https://foodbukka.herokuapp.com/api/v1/auth/login`)
        let body = {"username": username.value, password: password.value}
        R.setRequestHeader("Content-Type", "application/json")
        R.send(JSON.stringify(body));
        R.addEventListener('load',function (){
            let res = JSON.parse(R.responseText)
            if(R.status != 200){
                button.innerText = "signup"
                button.disabled = false
                console.log(res)
                error.innerText = res.error
            }else{
                localStorage.setItem('token',res.token)
                window.location.href = 'index.html'
            }
        })
    }else{
        button.innerText = "signup"
        button.disabled = false
        error.innerText = "Please provide a username and password"
    }
}
function validate(arr){
    return arr.every(function (val){
        return val != ""
    })
}