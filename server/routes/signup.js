const express = require('express');
const { query } = require('../mysql/mysql');
const { validateSignUp, validateBody } = require('../middlewares/validators')
const app = express();


app.post('/api/signup', [validateSignUp, validateBody], function (req, res) {

  let body = req.body;

  let queryInsert = 'INSERT INTO teacher SET ?';
  let args = {
    username: body.username,
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  };

  query(queryInsert, args, res, (data) => {
    return res.status(200).json({
      ok: true,
      data
    })
  });

});

module.exports = app;