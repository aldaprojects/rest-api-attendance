const express = require('express');
const { query }  = require('../mysql/mysql');
const { validateToken, validateSubject, validateTime, validateId, validateBody } = require('../middlewares/validators');
const app = express();


app.get('/api/user/:username', function (req, res) {

  const username = req.params.username;

  let args = username;
  let queryInsert = `SELECT username FROM teacher WHERE username = ?`;

  query(queryInsert, args, res, (data) => {
      
    return res.status(200).json({
      data
    })
  });

});

app.get('/api/email/:correo', function (req, res) {

  const correo = req.params.correo;

  let args = correo;
  let queryInsert = `SELECT email FROM teacher WHERE email = ?`;

  query(queryInsert, args, res, (data) => {
      
    return res.status(200).json({
      data
    })
  });

});


module.exports = app;