const express = require('express')
// const path = require('path')
const app = express()
const port = process.env.PORT || 5000
const mysql = require('mysql')
const bodyParser = require('body-parser')
const ent = require('ent')
const crypto = require('crypto')
const fs = require('fs')
// const empty = require('is-empty')

app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(bodyParser.json({ limit: '10Mb' }))
  .use(bodyParser.urlencoded({ extended: false }))

var con = mysql.createConnection({
  host: 'localhost',
  user: 'matcha',
  password: 'root42',
  multipleStatements: true
})

let db = fs.readFileSync('./config/Matcha.sql', 'UTF-8')
con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
  con.query(db, (err, resp) => {
    if (err) throw err
    console.log('Database created')
  })
})

app.post('/register', (req, res) => {
  if (req.body) {
    let uname = ent.encode(req.body.uname)
    let lname = ent.encode(req.body.lname)
    let fname = ent.encode(req.body.fname)
    let mail = ent.encode(req.body.mail)
    if (req.body.pwd === req.body.cpwd) {
      let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
      let req_user = 'INSERT INTO users(uname, lname, fname, email, password) VALUES(?, ?, ?, ?, ?)'
      con.query(req_user, [uname, lname, fname, mail, pwd], (err, res) => {
        if (err) throw err
        console.log('Data insert')
      })
      res.end()
    } else {
      res.send(uname)
      res.end()
    }
  } else {
    console.log('lol')
  }
})

app.post('/connexion', (req, res) => {
  let login = ent.encode(req.body.login)
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let req_user = 'SELECT * FROM users WHERE uname = ? AND password = ?'
  con.query(req_user, [login, pwd], (err, res2) => {
    if (err) throw err
    res.send(res2)
    console.log(res2[0])
    res.end()
  })
})

app.post('/changepassword', (req, res) => {
  let id = req.body.id
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let newpwd = crypto.createHash('whirlpool').update(req.body.newpwd).digest('hex')
  let cnewpwd = crypto.createHash('whirlpool').update(req.body.cnewpwd).digest('hex')
  let req_user = 'SELECT * FROM users WHERE id = ?'
  con.query(req_user, [id], (err, res) => {
    if (err) throw err
    if (pwd === res[0].password && newpwd === cnewpwd) {
      let req_user2 = 'UPDATE users SET password = ? WHERE id = ?'
      con.query(req_user2, [newpwd, id], (err, res) => {
        if (err) throw err
        console.log('ok')
      })
    }
  })
})

app.post('/profile', (req, res) => {
  let id = req.body.id
  let lname = ent.encode(req.body.lname)
  let fname = ent.encode(req.body.fname)
  let age = ent.encode(req.body.age)
  let gender = ent.encode(req.body.gender)
  let sexe = ent.encode(req.body.sexual_orientation)
  let req_user = 'UPDATE users SET lname = ?, fname = ?, age = ?, gender = ?, sexual_orientation = ? WHERE id = ?'
  con.query(req_user, [lname, fname, age, gender, sexe, id], (err, res) => {
    if (err) throw err
    console.log('okey')
  })
})
