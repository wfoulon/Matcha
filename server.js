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
const fileUpload = require('express-fileupload')
const cors = require('cors')
const sha1 = require('sha1')

app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json({ limit: '10Mb' }))
  .use(bodyParser.urlencoded({ extended: false }))

let con = mysql.createConnection({
  host: 'localhost',
  user: 'matcha',
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
    if (!req.params.token || !req.params.uname) {
      console.log('ERROR')
    } else {
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

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .get('/profil/:id', (req, res) => {
    if (!req.params.id) {
      console.log('ERROR')
    } else {
      let sql = 'SELECT * from users WHERE id = ?'
      con.query(sql, [req.params.id], (err, resu) => {
        if (err) throw err
        res.send(resu)
        res.end()
      })
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
          let sql1 = 'UPDATE users SET confirmation = 1 WHERE uname = ?'
          con.query(sql1, [req.params.uname], (err, resul) => {
            if (err) throw err
          })
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
  let gender = req.body.gender
  let sexual = req.body.sexual_orientation
  let sql = 'SELECT * FROM users WHERE uname = ? OR email = ?'
  con.query(sql, [uname, mail], (err, resu) => {
    if (err) throw err
    console.log(resu)
    if (resu.length === 0) {
      let sql = 'INSERT INTO users(uname, lname, fname, email, password, token, gender, sexual_orientation) VALUES(?, ?, ?, ?, ?, ?, ?, ?)'
      con.query(sql, [uname, lname, fname, mail, pwd, token, gender, sexual], (err, res) => {
        if (err) throw err
      })
      res.end()
      let sql2 = 'SELECT * FROM users WHERE uname = ? and token = ?'
      con.query(sql2, [uname, token], (err, res) => {
        if (err) throw err
        if (uname === res[0].uname && token === res[0].token) {
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
            if (error) throw error
            if (error) {
              console.log('Email has not been sent')
            } else {
              console.log('Email sent')
            }
          })
          transporter.close()
        } else {
          let sql2 = 'DELETE * FROM users WHERE uname = ?'
          con.query(sql2, [uname], (err, res) => {
            if (err) throw err
          })
        }
      })
    } else {
      console.log('error')
    }
  })
  res.end()
})

app.post('/connexion', (req, res) => {
  let login = ent.encode(req.body.login)
  let pwd = crypto.createHash('whirlpool').update(req.body.pwd).digest('hex')
  let sql = 'SELECT * FROM users WHERE uname = ? AND password = ? AND confirmation = 1'
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
      let sql1 = 'UPDATE users SET password = ? WHERE id = ?'
      con.query(sql1, [newpwd, id], (err, res) => {
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
  let sql = 'SELECT * FROM users WHERE uname = ? AND email = ?'
  con.query(sql, [login, email], (err, res) => {
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
        if (error) throw error
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
  let sql = 'SELECT * FROM users WHERE uname = ?'
  con.query(sql, [login], (err, res) => {
    if (err) throw err
    if (login === res[0].uname) {
      let sql1 = 'UPDATE users SET password = ? WHERE uname = ?'
      con.query(sql1, [cpwd, login], (err, res) => {
        if (err) throw err
        console.log('Password updated')
      })
    }
  })
  res.end()
})

app.post('/addtags', (req, res) => {
  // console.log(req.body)
  // console.log(req.body.tag.text)
  let tags = ent.encode(req.body.tag.text)
  let id = req.body.id
  // let sql = 'UPDATE profil_user SET tag = ? WHERE uid = ?'
  let sql = 'INSERT INTO profil_user(uid, tag) VALUES(?, ?)'
  con.query(sql, [id, tags], (err, res) => {
    if (err) throw err
    // console.log('done')
  })
  res.end()
})

// app.post('/deltags', (req, res) => {
//   // console.log(req.body)
//   // console.log(req.body)
//   // console.log(req.body.tag.text)
//   console.log(req.body.tags.id)
//   let tags = ent.encode(req.body.tags.text)
//   let id = req.body.id
//   // let sql = 'UPDATE profil_user SET tag = ? WHERE uid = ?'
//   let sql = 'DELETE FROM profil_user WHERE uid = ? AND tag = ?'
//   con.query(sql, [id, tags], (err, res) => {
//     if (err) throw err
//     console.log('done')
//   })
//   res.end()
// })

app.post('/home', (req, res) => {
  let id = req.body.id
  // console.log(id)
  let sql = 'SELECT * from users WHERE id = ?'
  con.query(sql, [id], (err, result) => {
    if (err) throw err
    let sexual = result[0].sexual_orientation
    let gender = result[0].gender
    let age = result[0].age
    let x = 2
    let y = 2
    let agemin = age - (x)
    let agemax = (age - (y) + (x) + (x))
    let sql = 'SELECT * from users WHERE sexual_orientation = ? AND gender != ? AND age BETWEEN ? AND ?'
    con.query(sql, [sexual, gender, agemin, agemax], (err, resul) => {
      if (err) throw err
      res.send(resul)
      res.end()
    })
  })
})

app.post('/profil/match', (req, res) => {
  let sql = 'SELECT * FROM `users` WHERE `id` IN ( SELECT `match` FROM `like` WHERE `uid` = ? AND status = 2)'
  con.query(sql, [req.body.id], (err, resul) => {
    if (err) throw err
    res.send(resul)
    res.end()
  })
})

app.post('/like', (req, res) => {
  let sql = 'SELECT * FROM `like` WHERE `uid` = ? AND `match` = ?'
  con.query(sql, [req.body.id, req.body.id_match], (err, resu) => {
    if (err) throw err
    console.log('first')
    console.log(req.body.id_match)
    console.log(req.body.id)
    if (resu[0]) {
      console.log('already')
    } else {
      // console.log(resu)
      let sql = 'SELECT * FROM `like` WHERE `match` = ? AND `uid` = ?'
      con.query(sql, [req.body.id, req.body.id_match], (err, resul) => {
        console.log('second')
        console.log(resul)
        // console.log(resul[0].match)
        console.log(req.body.id_match)
        console.log(req.body.id)
        if (err) throw err
        if (resul[0]) {
          if (req.body.id.to === resul[0].match.to) {
            let sql = 'INSERT INTO `like`(`uid`, `match`, `status`) VALUES (?, ?, 2); UPDATE `like` SET status = 2 WHERE `uid` = ? AND `match` = ?'
            con.query(sql, [req.body.id, req.body.id_match, req.body.id_match, req.body.id], (err, result) => {
              if (err) throw err
              console.log('letsgo')
            })
          }
        } else {
          let sql = 'INSERT INTO `like`(`uid`, `match`, `status`) VALUES (?, ?, 1)'
          con.query(sql, [req.body.id, req.body.id_match], (err, result) => {
            if (err) throw err
          })
        }
      })
    }
  })
  res.end()
})

app.post('/profil/match/dislike', (req, res) => {
  console.log(req.body.id_match)
  let sql = 'SELECT * FROM `like` WHERE `uid` = ? AND `match` = ?'
  con.query(sql, [req.body.id, req.body.id_match], (err, resu) => {
    if (err) throw err
    if (resu[0]) {
      let sql = 'UPDATE `like` SET status = -1 WHERE uid = ? AND `match` = ?'
      con.query(sql, [resu[0].uid, resu[0].match], (res, resul) => {
        if (err) throw err
      })
    } else {
      let sql = 'INSERT INTO `like`(`uid`, `match`, `status`) VALUES (?, ?, -1)'
      con.query(sql, [req.body.id, req.body.id_match], (err, result) => {
        if (err) throw err
      })
    }
  })
  res.end()
})

app.post('/profil/image/upload', (req, res) => {
  let name = uniqid() + '.png'
  let data = req.body.dataURL
  data = data.split(',')
  let ext = data[0].indexOf('image')
  if (ext !== -1) {
    let img = data[1]
    fs.writeFileSync('./images/' + name, img, 'base64', (err) => {
      if (err) throw err
    })
    let sql = 'INSERT INTO `image`(`uid`, `post_url`) VALUES (?, ?)'
    con.query(sql, [req.body.id, name], (err, result) => {
      if (err) throw err
      let sql = 'SELECT `post_url` from `image` WHERE uid = ?'
      con.query(sql, [req.body.id], (err, resu) => {
        if (err) throw err
        res.send(resu)
        res.end()
      })
    })
  }
})

app.post('/profil/image/display', (req, res) => {
  let sql = 'SELECT * FROM `image` WHERE uid = ?'
  con.query(sql, [req.body.id], (err, resu) => {
    if (err) throw err
    // if (err || resu.length === 0) {
    //   // let img = fs.readFileSync('./images/users/defaultm.png', 'base64')
    //   // resu[0].profimg = 'data:image/png;base64,' + img
    //   // res.send(resu)
    //   // res.end()
    //   // res.send('An err occured, please try again !')
    //   // res.end()
    //   // throw err
    // } else {
    //   let img = resu[0].post_url
    //   fs.readFile('./images/' + img, 'base64', (err, result) => {
    //     if (err) {
    //       img = fs.readFileSync('./images/users/defaultm.png', 'base64')
    //     } else img = result
    //     resu[0].img = 'data:image/png;base64,' + img
    res.send(resu)
    // console.log(resu)
    res.end()
    // })
    // }
  })
})

app.post('/profil/imgage/delete', (req, res) => {
  let sql = 'SELECT * FROM `image` WHERE id = ?'
  con.query(sql, [req.body.id], (err, resul) => {
    if (err) throw err
    console.log(resul)
    const fs = require('fs')
    fs.unlink('./images/' + resul[0].post_url, (err) => {
      if (err) throw err
      console.log('successfully deleted')
    })
    let sql = 'DELETE FROM `image` WHERE id = ?'
    con.query(sql, [req.body.id], (err, resu) => {
      if (err) throw err
    })
  })
  res.end()
})

app.post('/search/fetch', (req, res) => {
  const data = req.body.data
  // console.log(data.gender.length)
  if (data.gender.length > 0 && data.sexual.length > 0) {
    // if (data.gender.length > 1 || data.sexual.length > 1) {
    //   if (data.sexual.length === 2 && data.gender.length === 1) {
    //     let sql = 'SELECT * FROM `users` WHERE id != ? AND age BETWEEN ? AND ? AND sexual_orientation LIKE ? OR  sexual_orientation LIKE ? AND gender = ?'
    //     con.query(sql, [req.body.id, data.value.min, data.value.max, data.sexual[0], data.sexual[1], data.gender], (err, resu) => {
    //       if (err) throw err
    //       console.log('2-1')
    //       res.send(resu)
    //       res.end()
    //     })
    //   } else if (data.sexual.length === 3 && data.gender.length === 1) {
    //     let sql = 'SELECT * FROM `users` WHERE id != ? AND gender = ? AND age BETWEEN ? AND ? AND sexual_orientation LIKE ? OR  sexual_orientation LIKE ? OR sexual_orientation LIKE ?'
    //     con.query(sql, [req.body.id, data.gender, data.value.min, data.value.max, data.sexual[0], data.sexual[1], data.sexual[2]], (err, resu) => {
    //       if (err) throw err
    //       console.log('3-1')
    //       res.send(resu)
    //       res.end()
    //     })
    //   } else if (data.sexual.length === 2 && data.gender.length === 2) {
    //     let sql = 'SELECT * FROM `users` WHERE id != ? AND age BETWEEN ? AND ? AND sexual_orientation LIKE ? OR  sexual_orientation LIKE ? OR sexual_orientation LIKE ? AND gender LIKE ? OR gender LIKE ?'
    //     con.query(sql, [req.body.id, data.value.min, data.value.max, data.sexual[0], data.sexual[1], data.gender[0], data.gender[1]], (err, resu) => {
    //       if (err) throw err
    //       console.log('2-2')
    //       res.send(resu)
    //       res.end()
    //     })
    //   } else {
    //     let sql = 'SELECT * FROM `users` WHERE id != ? AND age BETWEEN ? AND ? AND sexual_orientation LIKE ? OR  sexual_orientation LIKE ? OR sexual_orientation LIKE ? AND gender LIKE ? OR gender LIKE ?'
    //     con.query(sql, [req.body.id, data.value.min, data.value.max, data.sexual[0], data.sexual[1], data.sexual[2], data.gender[0], data.gender[1]], (err, resu) => {
    //       if (err) throw err
    //       console.log('3-2')
    //       res.send(resu)
    //       res.end()
    //     })
    //   }
    // } else {
    //   let sql = 'SELECT * FROM `users` WHERE id != ? AND gender = ? AND sexual_orientation = ? AND age BETWEEN ? AND ?'
    //   con.query(sql, [req.body.id, data.gender, data.sexual, data.value.min, data.value.max], (err, resu) => {
    //     if (err) throw err
    //     console.log('la')
    //     res.send(resu)
    //     res.end()
    //   })
    // }
    let sql = 'SELECT * FROM `users` WHERE id != ? AND age BETWEEN ? AND ? AND (sexual_orientation LIKE ? OR  sexual_orientation LIKE ? OR sexual_orientation LIKE ?) AND (gender LIKE ? OR gender LIKE ?)'
    con.query(sql, [req.body.id, data.value.min, data.value.max, data.sexual[0], data.sexual[1], data.sexual[2], data.gender[0], data.gender[1]], (err, resu) => {
      if (err) throw err
      // console.log('3-2')
      res.send(resu)
      res.end()
    })
  } else {
    // res.send()
    res.end()
  }
})
