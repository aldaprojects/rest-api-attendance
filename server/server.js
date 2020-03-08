const express = require('express');
const bodyParser = require('body-parser');
const { connection } = require('./mysql/mysql');
const app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

connection.connect((err) => {
    if( err ){
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
// global routes
app.use( require('./routes/index' ))

app.listen(3000,() => {
    console.log('Listening port 3000');
});