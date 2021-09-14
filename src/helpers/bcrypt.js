//Configuracion de Bcrypt
const bcrypt = require('bcrypt')
const helpers = {}

helpers.EncryptPassword = async (password) =>{
    //encripto el password 12 veces 
    const Salt = await bcrypt.genSalt(12)
    //obtengo la contraseña encriptada
    const hash = await bcrypt.hash(password, Salt)
    return hash
}

helpers.MatchPassword = async (password, SavedPassword) => {
    try {
        //Compara la contraseña que puso el usuario con la de la base de datos
        return await bcrypt.compare(password, SavedPassword)
    } catch (error) {
        console.log('[-] '+error);
    }
}

module.exports=helpers;