const express = require('express');
const { query } = require('../mysql/mysql');
const { validateToken, validateBody, validateDate } = require('../middlewares/validators')
const app = express();

app.post('/api/day', [validateToken, validateBody, validateDate], function(req, res) {
    let body = req.body;

    let date = body.date;
    let id_teacher = body.id_teacher;

    let students = JSON.parse(JSON.parse((req.get("data"))));

    let queryInsert = 'INSERT INTO day SET ?';
    let args = {
        date,
        fk_teacher_day : id_teacher
    }

    query(queryInsert, args, res, (data) => {
        queryInsert = 'SELECT * FROM day WHERE date = ?';
        args = date;
        query(queryInsert, args, res, day => {

            let id_date = day[0].id_day;

            for( let i = 0; i < students.length; i++ ){
                queryInsert = `INSERT INTO attendance VALUES(null, ${ students[i].id_student }, ${ id_date }, 0)`;
                query(queryInsert, '', res, ()=>{});
            }
            
            return res.status(200).json({
                ok: true,
                day
            })
        })
    })
    

});

app.delete('/api/day', [validateToken, validateBody, validateDate], function(req, res) {
    let body = req.body;

    let date = body.date;
    let id_teacher = body.id_teacher;

    let queryInsert = 'DELETE FROM day WHERE date = ? and fk_teacher_day = ?';
    let args = [date, id_teacher];

    query(queryInsert, args, res, (data) => {
        return res.status(200).json({
            ok : true,
            data
        })
    });

});

app.get('/api/day', [validateToken, validateBody], function(req, res) {
    let body = req.body;

    let id_teacher = body.id_teacher;

    let queryInsert = 'SELECT * FROM day WHERE fk_teacher_day = ?';
    let args = id_teacher;

    query(queryInsert, args, res, ( days ) => {
        return res.status(200).json({
            ok : true,
            days
        })
    });

});

module.exports = app;