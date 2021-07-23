const router = require ('express').Router();
const Contacto = require('../models/Contacto');
// const validarAdministrador = require('../middlewares/validarAdministrador');
// const { marcarFavorito } = require('../models/Producto');

// Manera 1
// router.use(validarAdministrador)

router.route('/')
  .get(Todos)
  .post(Crear)

router.route('/:id')
  .put(Actulizar)
  .delete(Borrar)

router.route('/:idContacto/canales')
  .post(CrearCanal)
  .get(ContactoCanales)

  router.route('/:idContacto/canales/:idCanal')
  .put(ActualizarCanal)
  .delete(BorrarCanal)


async function Crear (req, res) {
  try {
    console.log(req.body);
    let { nombre, apellido, cargo, email, compania, ciudad, dir, interes } = req.body;
    const result = await Contacto.Crear(nombre,apellido, cargo,email, compania, ciudad, dir, interes);
    res.json({status: 200, message: 'Compania creada', data: result[0]});
  } catch (error) {
    console.error(error);
    res.json({status: 500, message: "Some error"})
  }
  
}

async function Actulizar (req, res) {
  let { nombre, 
    apellido, 
    cargo,
    email,
    compania } = req.body;
  const { id }  = req.params;
  const result = await Contacto.Actualizar(id, nombre, 
    apellido, 
    cargo,
    email,
    compania);
  res.json("recurso actualizado");
}

async function Todos (req, res) {
  let items = await Contacto.Todos();  
  res.json(items)
}

async function Borrar (req, res) {
  const {id} =req.params;
  const result = await Contacto.Borrar(id);
  res.json(`Compania ${id} eliminado`);
}

async function CrearCanal (req, res){
  const {idContacto} = req.params;
  const {canal, cuenta, preferencia} = req.body;
  const result = await Contacto.CrearCanal(idContacto, canal, cuenta, preferencia)
  res.json("Canal creado")
}

async function ActualizarCanal (req, res) {
  const {idContacto, idCanal} = req.params;
  const {canal, cuenta, preferencia} = req.body;
  const result = await Contacto.ActualizarCanal(idCanal, canal, cuenta, preferencia);
  res.json("recurso actualizado");
}

async function ContactoCanales (req, res) {
  const {idContacto} = req.params
  let items = await Contacto.Canales(idContacto);  
  res.json(items)
}

async function BorrarCanal (req, res) {
  const {idContacto, idCanal} = req.params;
  const result = await Contacto.BorrarCanal(idCanal);
  res.json(`Canal ${idCanal} eliminado`);
}

module.exports = router;

