const server = require("http")
let todoStore = []

function requestHandeler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const path = req.url
    const method = req.method
    if (method === 'POST' && path === '/todo') {
        getData(req, (error, data) => {
            if (error) {
                res.statusCode = 200
                console.log(error)
                res.end()
            } else {
                todoStore.push(data);
                res.end(data);
                
            }
        })
    } else if (method === 'GET' && path === '/todo') {
        res.end(JSON.stringify(todoStore))
    } else if (path === '/todoDelete') {
        getData(req, (error, data) => {
            if (error) {
                res.statusCode = 200
                res.end()
            } else {
                
                todoStore = arrayRemove(todoStore, data);
                res.end()
            }
        })
    }
}

const startServer = server.createServer(requestHandeler)

startServer.listen(3000, () => {
    console.log('server started')
})

//function to get data

function getData(req, callback) {
    let data
    let body = "";
    req.on("data", (todo) => {
        body += todo
    })
    req.on('end', () => {
        try {
            data = JSON.parse(body)
            callback(null, data.text)
        } catch (error) {
            callback(error)
        }
    })
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}