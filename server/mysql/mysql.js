const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'asistencia'
});

function query(query, args, res, callback){

  connection.query(query, args, (err, data)=>{

    if( err ){
      return res.status(500).json({
        ok: false,
        err: {
          message: err.sqlMessage
        }
      });
    } 
    
    return callback(data);

  });

}

module.exports = {
  connection,
  query
}