const express = require('express');
const { query } = require('../mysql/mysql');
const { validateToken, validateBody } = require('../middlewares/validators')
const app = express();

app.put('/api/attendance', [validateToken, validateBody], function(req, res){
    let body = req.body;

    let fk_student_attendance = body.id_student;
    let fk_day_attendance = body.id_day;
    let attendance = body.attendance;

    let queryInsert = 'UPDATE attendance SET attendance = ? WHERE fk_student_attendance = ? and fk_day_attendance = ?';
    let args = [attendance, fk_student_attendance, fk_day_attendance];

    query(queryInsert, args, res, (data) => {
        return res.status(200).json({
            ok :true,
            data
        })
    })
});

module.exports = app;