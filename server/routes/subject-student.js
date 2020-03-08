const express = require('express');
const { query } = require('../mysql/mysql');
const { validateToken } = require('../middlewares/validators')
const app = express();


app.post('/api/subject-student', [validateToken], function (req, res) {

    let id_student = req.query.id_student;
    let id_subject = req.query.id_subject;

    if( id_student && id_subject ) {
        let queryInsert = 'INSERT INTO subject_student SET ?';
        let args = {
            fk_student_ss : id_student,
            fk_subject_ss : id_subject
        };

        query(queryInsert, args, res, (data) => {
            return res.status(200).json({
                ok: true,
                data
            })
        })
    }
    else {
        return res.status(400).json({
            ok : false,
            err: {
                message: `'id_subject' and 'id_student' are required`
            }
        })
    }      
});

app.delete('/api/subject-student', [validateToken], function (req, res) {

    let id_student = req.query.id_student;
    let id_subject = req.query.id_subject;

    if( id_student && id_subject ) {
        let queryInsert = 'DELETE FROM subject_student WHERE fk_student_ss = ? and fk_subject_ss = ?';
        let args = [id_student, id_subject];

        query(queryInsert, args, res, (data) => {
            return res.status(200).json({
                ok: true,
                data
            })
        })
    }
    else {
        return res.status(400).json({
            ok : false,
            err: {
                message: `'id_subject' and 'id_student' are required`
            }
        })
    }      
});

app.get('/api/subject-student', [validateToken], function (req, res) {

    let id_subject = req.query.id_subject;

    if( id_subject ) {
        let queryInsert = 'SELECT id_student, student_id, name_student, photo_url FROM subject_student inner join student on subject_student.fk_student_ss = student.id_student WHERE fk_subject_ss = ?';
        let args = id_subject;

        query(queryInsert, args, res, (students) => {
            return res.status(200).json({
                ok: true,
                students
            })
        })
    }
    else {
        return res.status(400).json({
            ok : false,
            err: {
                message: `id_subject' is required`
            }
        })
    }      
});

module.exports = app;