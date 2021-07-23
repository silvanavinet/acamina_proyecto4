const router = require ('express').Router();
const Compania = require('../models/Compania');
// const validarAdministrador = require('../middlewares/validarAdministrador');
// const { marcarFavorito } = require('../models/Producto');

// Manera 1
// router.use(validarAdministrador)

router.route('/')
  .get(Todos)
  .post(Crear)

router.route('/:id')
  .put(Actualizar)
  .delete(Borrar)
  .get( Uno )

async function Todos (req, res) {
  try {
    let result = await Compania.Todos();  
    res.json({status: 200, message: 'ok', data: result});
  } catch (error) {
    res.json({status: 500, message: "Some error"})
  }
}

async function Crear (req, res) {
  try {
    let { nombre, ciudad, direccion, tel, email } = req.body;
    const result = await Compania.Crear(nombre, ciudad, direccion, tel, email);
    res.json({status: 200, message: 'Compania creada', data: result[0]});
  } catch (error) {
    res.json({status: 500, message: "Some error"})
  }
}

async function Actualizar (req, res) {
  try {
    let { nombre, ciudad, direccion, tel, email } = req.body;
    const { id }  = req.params;
    const result = await Compania.Actualizar(id, nombre, ciudad, direccion, tel, email);
    res.json({status: 200, message: `Compania ${id} actualizada `, data: result});  
  } catch (error) {
    res.json({status: 500, message: "Some error"})
  }
  
}

async function Borrar (req, res) {
  try {
    const {id} =req.params;
    const result = await Compania.Borrar(id);
    res.json({ status: 200, message: `ciudad ${id} eliminado`}); 
  } catch (error) {
    res.json({status: 500, message: "Some error"})
  }
}

async function Uno (req, res) {
  try {
    const { id } = req.params
    let result = await Compania.Uno(id);  
    res.json({status: 200, message: 'ok', data: result});
  } catch (error) {
    console.error(error);
    res.json({status: 500, message: "Some error"})
  }
}

module.exports = router;

