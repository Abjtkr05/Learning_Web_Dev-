const server = require("http")
const fs = require('fs')

function receptionist(request, response) {
    const path = request.url
    const method = request.method
    console.log(path)
    if (path == '/') {
        fs.readFile("./public/html/home.html", "utf-8", function (error, data) {
            if (error) {
                response.end('something went wrong')
            } else {
                response.setHeader("Content-type", 'text/html; charset=UTF-8')
                response.end(data)
            }
        })
    } else if (path == '/about') {
        response.end('about page')
    } else if (path == '/css/home.css') {
        fs.readFile("./public/css/home.css", "utf-8", function (error, data) {
            if (error) {
                response.end('something went wrong')
            } else {
                response.setHeader("Content-type", 'text/css')
                response.end(data)
            }
        })
    } else if (path == '/js/home.js') {
        fs.readFile("./public/js/home.js", "utf-8", function (error, data) {
            if (error) {
                response.end('something went wrong')
            } else {
                response.setHeader("Content-type", 'text/javascript')
                response.end(data)
            }
        })
    } else {
        response.end('ja jake marwa le')
    }
}


const staetServer = server.createServer(receptionist)

staetServer.listen(3000, () => {
    console.log('server started')
})
