const router = require ('express').Router();
const validarAdmin = require('../middlewares/validarAdministrador');
const usuario = require('../models/Usuario');
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const expressJwt = require('express-jwt');

router.route('/')
    .get(
        async (req,res) => {

            try {
                const { id, esAdministrador } = req.user.usuario
                let usuarios = null
                if ( esAdministrador === 1 ){
                    usuarios = await Usuario.obtenerTodos();
                } else {
                    usuarios = await Usuario.obtenerUno(id);
                }
                res.json(usuarios)
            } catch (error) {
                console.error(error);
                res.status(500).end()
            }
    })

    .put(
        validarAdmin, 
        async(req,res) => {
            try {
                const id_usuario = req.query.id;
                
                const { 
                    nombre_usuario, 
                    nombre_apellido, 
                    email, 
                    direccion_envio, 
                    telefono,
                    contrasena,
                    esAdministrador
                 } = req.body;
                
                 const result = await Usuario.actualizar(
                    id_usuario, 
                    nombre_usuario, 
                    nombre_apellido, 
                    email, 
                    direccion_envio, 
                    telefono, 
                    contrasena, 
                    esAdministrador
                    );
                res.json(result);    
            } catch (error) {
                console.error(error);
                res.status(500).end()
            }
        }
    )
    
    .delete(
        validarAdmin, 
        async(req,res) => {
            try {
                const id_usuario = req.query.id;
                await  Usuario.borrar(id_usuario);
                res.json('usuario eliminado con id' + id_usuario)    
            } catch (error) {
                console.error(error);
                res.status(500).end()
            }
        }
    );

module.exports = router;