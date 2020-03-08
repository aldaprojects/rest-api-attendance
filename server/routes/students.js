const express = require('express');
const { query } = require('../mysql/mysql');
const { validateBody, validateToken, validatePutStudent, validateId } = require('../middlewares/validators');
const app = express();

app.post('/api/students', [validateToken, validateBody, validatePutStudent], function (req, res) {
    let body = req.body;

    let queryInsert = 'INSERT INTO student SET ?';
    let args = {
        student_id   : body.student_id,
        name_student : body.name_student,
        fk_teacher_student : body.id_teacher
    };

    query(queryInsert, args, res, (data) => {
        return res.status(200).json({
            ok: true,
            data
        })
    });
});

app.get('/api/student/:id', [validateId], function (req, res) {
    
    let id = Number(req.params.id);

    let queryInsert = 'SELECT * FROM student WHERE id_student = ?';
    let args = id;

    query(queryInsert, args, res, (student) => {
        return res.status(200).json({
            ok : true,
            student: student[0]
        })
    })
});

app.delete('/api/student/:id', [validateToken, validateId], function (req, res) {
    
    let id = Number(req.params.id);

    let queryInsert = 'DELETE FROM student WHERE id_student = ?';
    let args = id;

    query(queryInsert, args, res, (data) => {
        return res.status(200).json({
            ok : true,
            data
        })
    })
});

app.put('/api/student/:id', [validateToken, validateId, validateBody], function (req, res) {
    
    let id = Number(req.params.id);
    let body = req.body;
    let queryOptions = '';
    let args = [];

    if ( body.student_id ) {
        queryOptions += 'student_id = ?, ';
        args.push(body.student_id);
    }
    if ( body.name_student ) {
        queryOptions += 'name_student = ?, ';
        args.push(body.name_student);
    }
  
    queryOptions = queryOptions.substr(0, queryOptions.length-2 );

    args.push(id);

    let queryInsert = `UPDATE student SET ${ queryOptions } WHERE id_student = ?`;

    query(queryInsert, args, res, (data) => {
        return res.status(200).json({
        ok: true,
        data
        })
    });
});


module.exports = app;