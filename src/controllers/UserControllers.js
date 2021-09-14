const pool = require('../database/connection')
const ctrl = {}
const {EncryptPassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

//Creo el token, y en este caso va a tener solamente el parametro id_user
//desde sub agrego parametros al token
ctrl.SignToken = Id_user => {
    //const parametros = {UserId, param2}
    return jwt.sign({
        iss: 'm1ch1',
        sub: Id_user
    },'m1ch1', {expiresIn: '1h'}) //vida del token (expira en 1h)
}

ctrl.register = async (req, res) => {
    const {username, password} = req.body
    if(username == null || username =='' || password == null || password == ''){
        res.json({'[-]' : 'Complete todos los campos.'})
    }else{
        const VerifyUser = await pool.query('SELECT * FROM users WHERE username = ?', username)
        if(VerifyUser.length >= 1){
            res.json({'[-]' : 'Este usuario ya existe.'})
        }else{
            const HashPassword = await EncryptPassword(password)
            await pool.query('INSERT INTO users SET ?', {username,'password': HashPassword})
            res.json({'[+]':'Usuario creado exitosamente.'})
        }
    }

}

ctrl.login = async (req, res) => {
    if(req.isAuthenticated()){
        //user lo obtengo en LocalStrategy
        //obtengo de user, el id_user y el username
        const {username, id_user} = req.user
        //creo el token, pasandole el id_user
        token = ctrl.SignToken(id_user)
        //creo un cookie llamada access_token y la retorno
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.json({'[+]' : 'Logeado como '+username})
    }
}



module.exports=ctrl