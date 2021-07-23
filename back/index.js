require('dotenv').config();
//trae expres y lo inicia en app
const express = require ('express');
const app = express();
const expressJwt= require('express-jwt');
const cors = require('cors');

const valRolBasic = require('./middlewares/validarUsuario')

//agregar middleware para trasformar todo a JSON
app.use(express.json());
app.use(cors());

app.use(expressJwt({
    secret: process.env.jwt_pass, 
    algorithms:['HS256']
})
.unless({
    path:[
        '/api/usuarios/login',
        '/api/usuarios/registrar'
    ] //' se protegen estas rutas
}));


app.use('/api/regiones', valRolBasic,  require('./routes/regiones.routes'));
app.use('/api/paises', valRolBasic, require('./routes/paises.routes'));
app.use('/api/ciudades', valRolBasic, require('./routes/ciudades.routes'));
app.use('/api/companias',valRolBasic, require('./routes/companias.routes'));
app.use('/api/contactos',valRolBasic, require('./routes/contactos.routes'));
app.use('/api/usuarios', require('./routes/auth.routes'));

app.all('*', (req, res, next) => {
    const err = new Error(`No se encontro la ruta ${req.originalUrl}`);
    err.status = 'fail';
    err.statusCode = 404;
    
    next(err);
  });

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

app.listen(process.env.PORT, () => {
    console.log('servidor escuchando en el  puerto' + process.env.PORT);
});