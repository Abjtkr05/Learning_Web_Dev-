//Line Number
var codeEditor = document.getElementById('codeEditor');
var lineCounter = document.getElementById('lineCounter');

codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});
codeEditor.addEventListener('click',function (){
    document.querySelector('.output').innerHTML = `Output`

})
codeEditor.addEventListener('touchstart',function (){
    document.querySelector('.output').innerHTML = `Output`

})
codeEditor.addEventListener('keydown', (e) => {

    let {keyCode} = e;
    let {value, selectionStart, selectionEnd} = codeEditor;
    if (keyCode === 9) {  // TAB = 9
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2)
    }
});

var lineCountCache = 0;

function line_counter() {
    var lineCount = codeEditor.value.split('\n').length;
    var outarr = new Array();
    if (lineCountCache != lineCount) {
        for (var x = 0; x < lineCount; x++) {
            outarr[x] = (x + 1) + '.';
        }
        lineCounter.value = outarr.join('\n');
    }
    lineCountCache = lineCount;
}

codeEditor.addEventListener('input', () => {
    line_counter();
});

//end

let button = document.getElementById('button')
let text = document.getElementById('codeEditor')

button.innerHTML = "Compile"
button.disabled = false
button.addEventListener('click', sendFunction);

function sendFunction() {
    button.innerHTML = "Compiling..."
    button.disabled = true
    button.classList = 'compiling';
    let val = document.getElementsByTagName('select')[0].value

    let R = new XMLHttpRequest();
    R.open("POST", "https://cros-anywhere.herokuapp.com/https://codequotient.com/api/executeCode", true);
    R.onreadystatechange = function () {
        if (R.readyState == 4 && R.status == 200) {
            let res = JSON.parse(R.responseText)
            if (res.error == "Code is null") {
                button.innerHTML = "Compile"
                button.disabled = false
                document.querySelector('.output').innerHTML = `<h4>Code is null</h4>`

            } else {
                setTimeout(f, 2500)

                function f() {

                    let codeId = res.codeId;
                    let url = `https://cros-anywhere.herokuapp.com/https://codequotient.com/api/codeResult/${codeId}`
                    R.open("GET", url, true)
                    R.onreadystatechange = function () {
                        if (R.readyState == 4 && R.status == 200) {
                            let status = JSON.parse(R.responseText)
                            let result = JSON.parse(status.data)
                            if (result.output != '') {
                                document.querySelector('.output').innerHTML = `<h4>${result.output}</h4>`
                                button.innerHTML = "Compile"
                                button.disabled = false
                            } else {
                                document.querySelector('.output').innerHTML = `<h4>${result.errors}</h4>`
                                button.innerHTML = "Compile"
                                button.disabled = false
                            }

                        }
                    }
                    R.send()

                }

            }
        }

    }
    let body = {"code": text.value, langId: val}
    R.setRequestHeader("Content-Type", "application/json")
    R.send(JSON.stringify(body));
}

