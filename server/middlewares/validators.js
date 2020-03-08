const jwt = require('jsonwebtoken');
const moment = require('moment');

let validateId = (req, res, next) => {
    let id = req.params.id;

    console.log(id);
    
    if( isNaN(id) ){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Invalid ID, must be a number'
            }
        });
    }
    
    next();
}

let validateDate = (req, res, next) => {
    let body = req.body;

    let date = body.date;

    let isValid = moment(date, "YYYY-MM-DD", true).isValid();

    if( isValid ) {
        return next();
    }
    else {
        return res.status(400).json({
            ok : false,
            err : {
                message: 'Invalid date format, must be YYYY-MM-DD'
            }
        })
    }
}

let validateBody = (req, res, next) => {
    let body = req.body;

    if( Object.keys(body).length === 0 ){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Body can\'t be null'
            }
        });
    }
    return next();
}

let validateAuth = (req, res, next) => {
    let body = req.body;

    let errors = []

    if( body ) {
        if( !body.password ){
            errors.push('Column \'password\' cannot be null')
        }
        if( !body.username ){
            errors.push('Column \'username\' cannot be null')
        }
        if( errors.length > 0 ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: errors
                }
            })
        }
        return next();
    }
}

let validateSignUp = (req, res, next) => {
    let body = req.body;

    let errors = []

    if( body ) {
        if( !body.password ){
            errors.push('Column \'password\' cannot be null')
        }
        if( !body.username ){
            errors.push('Column \'username\' cannot be null')
        }
        if( !body.name ){
            errors.push('Column \'name\' cannot be null')
        }
        if( !body.email ){
            errors.push('Column \'email\' cannot be null')
        }
        if( errors.length > 0 ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: errors
                }
            })
        }
        return next();
    }
}

let validateToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify( token, 'seed', (err, decoded) => {
        if ( err ) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        next();
    })
}

let validateSubject = (req, res, next) => {
    
    let body = req.body;

    let errors = []

    if( body ) {
        if ( !body.name ) {
            errors.push('Column \'name\' cannot be null');
        }
        if ( !body.groupname ) {
            errors.push('Column \'groupname\' cannot be null');
        }
        if ( !body.start_time ) {
            errors.push('Column \'start_time\' cannot be null');
        }
        if ( !body.end_time ) {
            errors.push('Column \'end_time\' cannot be null');
        }
        if ( !body.id_teacher ) {
            errors.push('Column \'id_teacher\' cannot be null');
        }

        if( errors.length > 0 ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: errors
                }
            })
        }
        return next();
    }
}

let validateTime = (req, res, next) => {

    let start = req.body.start_time;
    let end = req.body.end_time;

    let validStart = moment(start, "HH:mm:ss", true).isValid();
    let validEnd = moment(end, "HH:mm:ss", true).isValid();

    let errors = [];

    if ( !validStart ) {
        errors.push('\'start_time\' must be in 24 hours format');
    }
    if ( !validEnd ) {
        errors.push('\'end_time\' must be in 24 hours format');
    }
    if( errors.length > 0) {
        return res.status(400).json({
            ok: false,
            err: errors
        })
    }

    return next();
}

let validatePutStudent = (req, res, next) => {
    let body = req.body;
    
    let errors = [];

    if( !body.student_id ) {
        errors.push('Column \'student_id\' cannot be null');
    }
    if( !body.name_student ) {
        errors.push('Column \'name_student\' cannot be null');
    }
    if( !body.id_teacher ) {
        errors.push('Column \'id_teacher\' cannot be null');
    }
    if( errors.length > 0 ){
        return res.status(400).json({
            ok: false,
            err: {
                message: errors
            }
        })
    }
    return next();
}

module.exports = {
    validateId,
    validateAuth,
    validateSignUp,
    validateToken,
    validateBody,
    validateSubject,
    validateTime,
    validatePutStudent,
    validateDate
}