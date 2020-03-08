const express = require('express')
const app = express()

app.use( require('./signup' ));
app.use( require('./login' ));
app.use( require('./subjects' ));
app.use( require('./students' ));
app.use( require('./subject-student' ));
app.use( require('./day' ));
app.use( require('./attendance' ));
app.use( require('./user' ));

module.exports = app