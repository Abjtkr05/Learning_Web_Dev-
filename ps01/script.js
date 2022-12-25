let time = document.getElementById('clock')
let hr = 0;
let min = 0;
let sec = 0;
let var1 = setInterval(fun, 1000);
function fun(){
    sec += 1;
    if(sec > 60){
        min += 1;
        sec = 0;
    }
    if(min > 60){
        min = 0;
        hr += 1;
    }
    let thr = (hr < 10) ? "0" + hr : hr;
    let tmin = (min < 10) ? "0" + min : min;
    let tsec = (sec < 10) ? "0" + sec : sec;
    time.innerText = thr + ":" + tmin + ":" + tsec

    if(tmin == 1){
        clearInterval(var1)
    }
}
