//parametros de conexion a mysql
module.exports={
    database : {
        connectionLimit: 30, //cantidad de conexiones simultaneas
        host: 'localhost', //host de la base de datos
        user:'root',   //user de la base de datos
        password:'', 
        database:'crudnode' //base de datos que uso en mysql y gestiono en phpmyadmin
    } 
}