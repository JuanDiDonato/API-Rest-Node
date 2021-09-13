//Express
const express = require('express')
const app = express()
//Morgan
const morgan = require('morgan')


//Server setting
app.set('port', 5000)
app.use(express.json()) //Especifico que voy a permitir JSON's
//Morgan
app.use(morgan('dev'))

//Routes
app.use(require('./routes/routes'))

//Start Server
app.listen(app.get('port'),()=>{
    console.log('[+] Servidor iniciado en: http://localhost:'+app.get('port'))
})