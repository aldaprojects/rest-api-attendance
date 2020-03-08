const express = require('express');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { query } = require('../mysql/mysql');
const { validateAuth, validateBody } = require('../middlewares/validators');
const app = express();


app.post('/api/login', [validateAuth, validateBody], function (req, res) {

  let body = req.body;

  let queryInsert = 'SELECT * FROM teacher WHERE username = ?';
  let args = body.username;

  query(queryInsert, args, res, (teacher) => {

    if( teacher.length === 0 ) {
      return res.status(404).json({
          ok: false,
          err: {
              message: 'User not found'
          }
      });
    }  

    if( !bcrypt.compareSync(body.password, teacher[0].password) ){
      return res.status(400).json({
          ok: false,
          err: {
              message: 'Incorrect password'
          }
      });
    }

    delete teacher[0].password;

    let token = jwt.sign({
        teacher: teacher[0]
    }, 'seed', { expiresIn: '1h' });

    return res.status(200).json({
        ok: true,
        teacher: teacher[0],
        token
    });
  })
});

module.exports = app;