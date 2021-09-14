//importo la forma de conexion (mediante pool) de mysql
const pool = require('../database/connection')
const ctrl = {}

ctrl.create = async (req, res) => {
    //del body, obtenemos el titulo y la descripcion
    //el body hace referencia a un html, los JSON de inmsomnia, etc
    const {title, description} = req.body

    //METODO SIN ASYNC - AWAIT
    //     pool.query('insert into tasks = ?', [obj],(error,success)=>{
    //         if(error){
    //              return error
    //         }else{
    //             return success
    //         }
    //    });
   
    //hago la consulta
    await pool.query('INSERT INTO tasks SET ?', {title,description})

   //respondo con un json
   res.json('Añadido exitosamente.')
}


ctrl.tasks = async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks')
    res.json(result)
}

ctrl.task_id = async (req, res) => {
    const {id} = req.params
    const result = await pool.query('SELECT * FROM tasks WHERE id = ?', id)
    res.json(result[0])
}

ctrl.edit = async (req, res) => {
    const {title, description} = req.body
    //obtengo el id desde los parametros de la ruta
    const {id} = req.params 
    const obj = { title, description}
    await pool.query('UPDATE tasks SET ? WHERE id = ? ', [obj,id]) //si hay mas de un "?", los parametros los pongo en una lista
    res.json('Actualizado satifactoriamente.')
}

ctrl.trash = async (req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM tasks WHERE id = ?', id)
    res.json('Tarea eliminada satifactoriamente.')
}

module.exports=ctrl