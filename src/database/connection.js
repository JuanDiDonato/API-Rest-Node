//MySQL settings
const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('./keys')
//Creo la variable con la que voy a hacer las peticiones a la base
const pool = mysql.createPool(database)

//Cuando me conecto, puedo obtener un error o una conexion
pool.getConnection((error,connection) => {
    if(error){
        return console.log(error);
    }
    if(connection){
        //Si devuelve una conexion, hace las consultas solicitadas, y luego
        //cierra la conexion
        console.log('[+] Base de datos conectada.');
        return connection.release() 
    }
})

//Cuando llegue una consulta (query) a la base
//Permite conexiones asincronas
pool.query = promisify(pool.query)

module.exports=pool