const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mysql = require('mysql')
const bodyParser = require('body-parser')
const ent = require('ent')
const crypto = require('crypto')
const fs = require('fs')
const nodemailer = require('nodemailer')
const uniqid = require('uniqid')
const sha1 = require('sha1')

app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(bodyParser.json({ limit: '10Mb' }))
  .use(bodyParser.urlencoded({ extended: false }))

var con = mysql.createConnection({
  host: 'localhost',
  user: 'localhost',
  password: 'root42',
  multipleStatements: true
})

let db = fs.readFileSync('./config/Matcha.sql', 'UTF-8')
con.connect(function (err) {
  if (err) throw err
  con.query(db, (err, resp) => {
    if (err) throw err
  })
})

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: true}))
    .get('/reset_password/:token/:uname', (req, res) => {
    if (!req.params.token || !req.params.uname)
    console.log('ERROR')
    else {
      let sql = 'SELECT * from users WHERE uname = ? AND token = ?'
      con.query(sql, [req.params.uname, req.params.token], (err, res) => {    
        if (err) throw err
        if (res[0].token === req.params.token && res[0].uname === req.params.uname){
          console.log('GOOD')
        }
      })
      res.end()
    } 
})

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .get('/validation/:token/:uname', (req, res) => {
    if (!req.params.token || !req.params.uname)
      console.log('ERROR')
    else {
      let sql = 'SELECT * from users WHERE uname = ? AND token = ?'
      con.query(sql, [req.params.uname, req.params.token], (err, res) => {
        if (err) throw err
        if (res[0].token === req.params.token && res[0].uname === req.params.uname) {
           console.log('GOOD')
        }
      })
      res.end()
    }
  })
app.post('/register', (req, res) => {
  let uname = ent.encode(req.body.uname)
  let lname = ent.encode(req.body.lname)
  let fname = ent.encode(req.body.fname)
  let mail = ent.encode(req.body.mail)
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let token = sha1(uniqid())
  let sql = 'INSERT INTO users(uname, lname, fname, email, password, token) VALUES(?, ?, ?, ?, ?, ?)'
  con.query(sql, [uname, lname, fname, mail, pwd, token], (err, res) => {
    if (err) throw err
    })
    res.end()
  let sql2 = "SELECT * FROM users WHERE uname = ? and token = ?"
  con.query(sql2, [uname, token], (err, res) => {
    if (err) throw err
    if (uname === res[0].uname && token === res[0].token){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'willfln34@gmail.com',
          pass: 'matcha1234'
        }
      })
      let mail = {
        from: 'Matcha@gmail.com',
        to: res[0].email,
        subject: 'Account validation',
        html: '<p>Welcome to Matcha ' + res[0].uname + '</p><br><p>To validate your account please click on the link below:</p><br><a href="http://localhost:3000/validation/' + res[0].token + '/' + res[0].uname + '">Validate your account</a>'
      }
      transporter.sendMail(mail, function (error, info) {
        if (error) {
          console.log('Email has not been sent')
        } else {
          console.log('Email sent')
        }
      })
      transporter.close()
    }
    else {
      let sql2 = "DELETE * FROM users WHERE uname = ?"
      con.query(sql2, [uname], (err, res) => {
        if (err) throw err
      })
    }
  })
  res.end()
  let sql3 = "UPDATE users set confirmation = 1"
  con.query(sql3, (err, res) => {
    if (err) throw err
  })
  res.end()
})

app.post('/connexion', (req, res) => {
  let login = ent.encode(req.body.login)
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let sql = 'SELECT * FROM users WHERE uname = ? AND password = ?'
  con.query(sql, [login, pwd], (err, res2) => {
    if (err) throw err
    if (res2.length === 1) {
      res.send(res2)
    }
    res.end()
  })
})

app.post('/changepassword', (req, res) => {
  let id = req.body.id
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let newpwd = crypto.createHash('whirlpool').update(req.body.newpwd).digest('hex')
  let cnewpwd = crypto.createHash('whirlpool').update(req.body.cnewpwd).digest('hex')
  let sql = 'SELECT * FROM users WHERE id = ?'
  con.query(sql, [id], (err, res) => {
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
  let sql = 'UPDATE users SET lname = ?, fname = ?, age = ?, gender = ?, sexual_orientation = ? WHERE id = ?'
  con.query(sql, [lname, fname, age, gender, sexe, id], (err, res) => {
    if (err) throw err
  })
})

app.post('/changemail', (req, res) => {
  let mail = ent.encode(req.body.newemail)
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let uname = ent.encode(req.body.uname)
  let sql = 'SELECT * FROM users WHERE uname = ? AND password = ?'
  con.query(sql, [uname, pwd], (err, res) => {
    if (err) throw err
    let id = res[0].id
    let sql = 'UPDATE users SET email = ? WHERE id = ?'
    con.query(sql, [mail, id], (err, res) => {
      if (err) throw err
    })
  })
  res.end()
})

app.post('/deleteaccount', (req, res) => {
  let uname = ent.encode(req.body.uname)
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let sql = 'DELETE FROM users WHERE uname = ? AND password = ?'
  con.query(sql, [uname, pwd], (err, res) => {
    if (err) throw err
    res.send(res)
  })
  res.end()
})

app.post('/forgot', (req, res) => {
  let login = ent.encode(req.body.login)
  let email = ent.encode(req.body.email)
  let req_user = 'SELECT * FROM users WHERE uname = ? AND email = ?'
  con.query(req_user, [login, email], (err, res) => {
    if (err) throw err
    if (login === res[0].uname && email === res[0].email) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'willfln34@gmail.com',
          pass: 'matcha1234'
        }
      })
      let mail = {
        from: 'Matcha@gmail.com',
        to: res[0].email,
        subject: 'Reset your password',
        html: '<p>Hello ' + res[0].uname + '</p><br><p>To change your password please click on the link below:</p><br><a href="http://localhost:3000/reset_password/' + res[0].token + '/' + res[0].uname +'">Change password</a>'
      }
      transporter.sendMail(mail, function (error, info) {
        if (error) {
          console.log('Email has not been sent')
        } else {
          console.log('Email sent')
        }
      })
      transporter.close()
    }
  })
  res.end()
})

app.post('/reset', (req, res) => {
  let login = ent.encode(req.body.login)
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let cpwd = crypto.createHash('whirlpool').update(req.body.cpwd).digest('hex')
  let req_user = 'SELECT * FROM users WHERE uname = ?'
  con.query(req_user, [login], (err, res) => {
    if (err) throw err
    if (login === res[0].uname) {
      let req_user2 = 'UPDATE users SET password = ? WHERE uname = ?'
      con.query(req_user2, [cpwd, login], (err, res) => {
        if (err) throw err
        console.log('Password updated')
      })
    }
  })
  res.end()
})
