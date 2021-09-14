//Passport
//Usa estrategias de logeo para loguear usuarios ==> Yo defino las estrategias 
//Las estrategias define que va a authenticar => (es como el JWTRequired de Python)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const {MatchPassword} = require('./helpers/bcrypt')
const pool = require('./database/connection')

//Obtebes token desde la cookies (extraes el token de la cookie)
const CookiExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token
}


passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    //Done: cuando termina de authenticar, que continue.

},async (username, password, done) =>{
    const row = await pool.query('SELECT * FROM users WHERE username = ?', username)
    if(row.length === 0){
        let message = '[-] User not found!'
        //done recibe 3 parametros, el primero retorna un error si decidimos enviarlo
        //el segundo recibe un usuario (en este caso no encontro ninguno, por eso es false)
        //el tercero es un parametro (en este caso un mensaje)
        return done(null,false,message)
    }else{
        const user = row[0]
        const SavedPassword = user.password
        const ValidPassword = await MatchPassword(password, SavedPassword)
        if(ValidPassword){
            let message = '[+] Welcome '+ user.username
            return done(null,user,message)
        }else{
            let message = '[-] Invalid credentials'
            return done(null,false,message)
        }
    }
})) 


passport.use(new JwtStrategy({
    jwtFromRequest: CookiExtractor,
    secretOrKey: 'm1ch1'
    //payload representa los parametros dentro del token, en este caso el userid que defini en usercontroller.
},(payload, done) => {
    //consulto en la base de datos si el id_user que esta en el token coincide con algun id_user de la base de datos
    //con la funcion flecha defino:
    //si hay un error que lo retorne, y si hay un usario, que lo retorne.
    pool.query('SELECT * FROM users WHERE id_user = ?', [payload.sub],(error,user) => {
        if(error)
            return done(error,false)
        if(user)
            return done(null,user)
        else
            return done(null,false)
    }) 
}))

