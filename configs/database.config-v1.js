let mysql = require('mysql')

let con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Asdf12345!@',
    database: 'db_core_api'
})

con.connect(function(error){
    if ( !!error ){
        console.log(error)
    }else{
        console.log('Connection Successfully!')
    }
})

module.exports = con;