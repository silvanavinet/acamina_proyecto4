const Sequelize = require ('sequelize');
const path = process.env.conexion_bd;
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
        console.log('contactando a la base de datos');
}).catch(err => {
        console.log('error en la conexion con la base de datos', err);
}).finally(() => {

})

module.exports= sequelize;