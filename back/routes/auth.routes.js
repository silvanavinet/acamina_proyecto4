const router = require ('express').Router();
const sequelize = require('../conexion');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validarAdministrador = require('../middlewares/validarAdministrador')
const Usuario = require('../models/Usuario');

router
  .post('/login', Login)
  .post('/registrar',  // validarAdministrador,
    Registrar
  );

router.route('/')
  .get(Todos)

router.route('/:id')
  .put(Actualizar)
  .delete(Borrar)



async function Login (req, res) {
  
  const { email, contrasena } = req.body;

  console.log(req.body);

  let result

  try {
      result = await sequelize.query(`
        SELECT 
            * 
        FROM 
            usuarios
        WHERE 
            email = ?`
        , {
          type: sequelize.QueryTypes.SELECT,
          replacements : [ email ]
      });    

      if(result.length >  0 && bcrypt.compareSync(contrasena, result[0].contrasena)) {
          const{     
            nombre,
            apellido,
            email,
            contrasena,
            perfil, 
            id } = result[0]
          // console.log(result[0]);
  
          let usuario = { 
              nombre,
              apellido,
              email,
              contrasena,
              perfil, 
              id
          }
  
          const token = jwt.sign({ usuario }, process.env.jwt_pass);
          res.send({access_token: token});
      } else { //si no, el usuario o cont. estàn malos
          res.status(401).json('usuario y/o contraseña incorrectas');
      }

  } catch (error) {
      console.log(error);
      console.log("ERROR");
      res.status(500)
      res.send("Error interno")
  }

}

async function Registrar (req, res) {
  const {
    nombre,
    apellido,
    email,
    contrasena,
    perfil 
  }  = req.body;

  try {
    
    const passwordHash = bcrypt.hashSync(contrasena,10);

    const result = await Usuario.Crear(nombre, apellido, email, passwordHash, perfil)
    
    res.status(201).send("Recurso creado " + result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno")
  }

}

async function Todos (req, res) {
  try {
    const result = await Usuario.Todos()
  
  res.json(result)
  } catch (error) {
    
  }
}

async function Actualizar (req, res) {
  const {id } = req.params
  const { contrasena, perfil  } = req.body
  
  const passwordHash = bcrypt.hashSync(contrasena,10);

  const result = await Usuario.Actualizar( id, passwordHash,  perfil )
  
  res.json(result)
}

async function Borrar (req, res) {
  try {
    const result = await Usuario.Borrar( req.params.id )
    res.json(result)
  } catch (error) {
    console.error(error);
  }
}


router.route('/admin')
    .get(IsAdmin)


async function IsAdmin (req, res) {
    try {
        const isAdmin = req.user.usuario.perfil

        if (isAdmin === "admin") res.json({permission: true})
        else res.json({permission: false})
        
    } catch (error) {
        console.error(error);
    }

}


module.exports = router;