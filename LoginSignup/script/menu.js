let R = new XMLHttpRequest();
R.open('GET',`https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d413/menu`)
R.send()
R.addEventListener('load',function (){
    console.log(R.responseText)
    console.log(JSON.parse(R.responseText))
})