const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000
const mysql = require('mysql')
const bodyParser = require('body-parser')
const ent = require('ent')
let fs = require('fs')

app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(bodyParser.json({ limit: '10Mb' }))
    .use(bodyParser.urlencoded({ extended: false }))

app.post('/register', (req, res) => {
        let lname = ent.encode(req.body.lname)
        res.end()
    })

var con = mysql.createConnection({
    host: "localhost",
    user: "localhost",
    password: "root42"
})

let db = fs.readFileSync('./config/Matcha.sql', 'UTF-8')

con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
    con.query(db, (err, resp) => {
        if (err) throw err
        console.log("Database created")
    })

})
