const express = require('express')
const e = require("express");
const app = express();
const fs = require('fs');
const session = require('express-session')
app.use(express.static(`${__dirname}`))
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))


app.get("/", home)
app.get("/login", home)
app.get("/signup", home)
app.route('/todoo').get(todoGet).post(postTodo)
app.post('/todoRemove', remove);
app.post('/login', login);
app.post('/signup', signin);
app.get('/home', mainpage);
app.post('/logout', logout)

function logout(req, res) {
  // console.log(req.session)
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      // return next(err)
    }

  })
}

function home(req, res) {
  if (req.session.logedInStatus)
    res.redirect('http://127.0.0.1:3030/home');
  else {
    res.sendFile(__dirname + '/loginSignup/index.html')
  }
}

function mainpage(req, res) {
  if (req.session.logedInStatus)
    res.sendFile(__dirname + '/tOdO/index.html')
  else {
    res.redirect('http://127.0.0.1:3030')

  }

}

function todoGet(req, res) {
  getTodo((err, data) => {
    if (err) {
      res.end(err)
    } else {
      res.json(data);
    }
  })
}

function postTodo(req, res) {
  getTodo((err, data) => {
    if (err) {
      res.end(err)
    } else {
      data.push(req.body.text)
      saveTodo(data, () => {
        res.end();
      })
      res.end(req.body.text);
    }
  })
}

function remove(req, res) {
  getTodo((err, toDo) => {
    if (err) {
      res.end('Sorry An Error Occoured Awwww!')
    } else {
      toDo = arrayRemove(toDo, req.body.text);
      saveTodo(toDo, (err, data) => {
        res.end();
      })
      res.end()
    }
  })
}

function arrayRemove(arr, value) {

  return arr.filter(function (ele) {
    return ele != value;
  });
}

function getTodo(callback) {
  fs.readFile("./todoList.txt", "utf-8", (err, data) => {
    if (err) {
      callback(err, null)
    } else {

      callback(null, JSON.parse(data))
    }
  })
}

function saveTodo(data, callback) {
  fs.writeFile("./todoList.txt", JSON.stringify(data), (err) => {
    if (err) {
      callback(err, null)
      return;
    }
  })
}


//signup signin


function login(req, res) {

  getData((err, data) => {
    if (err) {
      console.log(err)
    } else {
      const user = data.filter((user) => {
        if (user.username === req.body.username && user.password === req.body.password) {
          return true;
        }
      })
      if (user.length === 1) {
        req.session.logedInStatus = true;
        res.redirect('http://127.0.0.1:3030/home');
      } else {
        console.log(user)
        res.end("signup failed")
      }
    }
  })

}

function signin(req, res) {
  getData((err, data) => {
    if (err) {
      console.log(err)
    } else {
      let val;
      const user = data.filter((user) => {
        if (user.username === req.body.username || user.email === req.body.email) {
          val = user.username === req.body.username ? "username" : "email"
          return true;
        }
      })
      if (user.length === 0) {
        data.push(req.body)
        saveData(data, (err) => {
          console.log(err)
        })
        req.session.logedInStatus = true;
        res.redirect('http://127.0.0.1:3030/home');
      } else {
        console.log(val)
        res.end("signup Failed")
      }

    }
  })
}

function getData(callback) {
  fs.readFile("./loginSignup/users.txt", "utf-8", (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, JSON.parse(data))
    }
  })
}

function saveData(data, callback) {
  fs.writeFile("./loginSignup/users.txt", JSON.stringify(data), (err) => {
    if (err) {
      callback(err)
      return;
    } else {

    }
  })
}

module.exports = app;