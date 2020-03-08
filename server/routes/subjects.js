const express = require('express');
const { query }  = require('../mysql/mysql');
const { validateToken, validateSubject, validateTime, validateId, validateBody } = require('../middlewares/validators');
const app = express();


app.get('/api/subjects', function (req, res) {

  let queryInsert = 'SELECT * FROM subject';
  let args = {};

  query(queryInsert, args, res, (subjects) => {
    return res.status(200).json({
      ok: true,
      subjects
    })
  });

});

app.post('/api/subjects', [validateToken, validateSubject, validateTime], function (req, res) {

  let body = req.body;

  let queryInsert = 'INSERT INTO subject SET ?';
  let args = {
    name: body.name,
    groupname: body.groupname,
    start_time: body.start_time,
    end_time: body.end_time,
    fk_teacher_subject: body.id_teacher
  };

  query(queryInsert, args, res, (data) => {
    return res.status(200).json({
      ok: true,
      data
    })
  });

});

app.put('/api/subject/:id', [validateToken, validateId, validateBody], function (req, res) {

  let body = req.body;
  let id = Number(req.params.id);

  let queryOptions = '';
  let args = [];

  if ( body.name ) {
    queryOptions += 'name = ?, ';
    args.push(body.name);
  }
  if ( body.groupname ) {
    queryOptions += 'groupname = ?, ';
    args.push(body.groupname);
  }
  if ( body.start_time ) {
    queryOptions += 'start_time = ?, ';
    args.push(body.start_time);
  }
  if ( body.end_time ) {
    queryOptions += 'end_time = ?, ';
    args.push(body.end_time);
  }
  
  queryOptions = queryOptions.substr(0, queryOptions.length-2 );

  args.push(id);

  let queryInsert = `UPDATE subject SET ${ queryOptions } WHERE id_subject = ?`;

  query(queryInsert, args, res, (data) => {
    return res.status(200).json({
      ok: true,
      data
    })
  });

});

app.delete('/api/subject/:id', [validateToken, validateId], function (req, res) {

  let id = Number(req.params.id);

  let queryInsert = 'DELETE FROM subject WHERE id_subject = ?';
  let args = id;

  query(queryInsert, args, res, (subjects) => {
    return res.status(200).json({
      ok: true,
      subjects
    })
  });

});

module.exports = app;