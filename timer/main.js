let timeOption = document.getElementById('time-option')
let option = document.querySelector('.option')
let dispay = document.querySelector('.time')


timeOption.addEventListener('click', changeTime)
option.addEventListener('click', startStop)

function changeTime(event) {
    let time = event.target.parentNode.parentNode.previousElementSibling
    if (event.target.classList.contains('add')) {
        let currentTime = parseInt(time.innerText) + 1;
        time.innerText = currentTime + " min"
    }
    if (event.target.classList.contains('sub')) {
        let currentTime = parseInt(time.innerText) - 1;
        if (currentTime >= 0)
            time.innerText = currentTime + " min"
    }
}

function startStop(event) {
    if (event.target.classList.contains('Start')) {
        event.target.innerText = 'Pause'
        document.querySelectorAll('.add')[0].disabled = true;
        document.querySelectorAll('.add')[1].disabled = true;
        document.querySelectorAll('.sub')[0].disabled = true;
        document.querySelectorAll('.sub')[1].disabled = true;
        event.target.disabled = true;
        runTimer(parseInt(timeOption.firstElementChild.firstElementChild.nextElementSibling.innerText),
            parseInt(timeOption.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerText),1);
    }
    if (event.target.classList.contains('Reset')) {
        window.location.reload()
    }
}

function runTimer(t, b,p1) {
    let currentTimem = t
    let currentTimes = 0
    updateTime(currentTimem,currentTimes)
    console.log(currentTimem,currentTimes)
    let cid = setInterval(function (){

        if(currentTimes == 0){
            currentTimem--
            currentTimes = 59;
        }else{
            currentTimes--;
        }
        if(currentTimem == 0 && currentTimes == 0){
            clearInterval(cid)
            let i = document.querySelector('.info')
            let v;
            if(i.innerText == 'Break'){
                v = p1 + 1;
                i.innerText = 'Session ' + v
            }else{
                i.innerText = 'Break'
                v = p1
            }
            runTimer(b,t,v);
        }
        updateTime(currentTimem,currentTimes)

    },1000)
}
function updateTime(min,sec){
    let tmin = (min < 10) ? "0" + min : min;
    let tsec = (sec < 10) ? "0" + sec : sec;
    dispay.innerText = tmin + ":" + tsec
}