const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const uuidv4 = require('uuid/v4')
const bodyParser = require('body-parser')

const port = 3000;

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'def',
    password: 'bla',
    database: 'count'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
})

app.post('/score', (req, res) => {

    const id = uuidv4()
    let user = 'Unknown';
    if (req.body && req.body.user) {
        user = req.body.user;
    }
    const score = {
        id,
        user: user,
        score: parseInt(req.body.score)
    }
    console.log(score);
    connection.query("INSERT INTO score SET ? ", score, function (error, results, fields) {
        if (error) throw error;
    });
   return res.send(score);
});

app.get('/score', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    connection.query("SELECT * FROM score ORDER BY score DESC LIMIT 10", function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.listen(port, () => {
   console.log('running...');
});
