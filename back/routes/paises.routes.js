const router = require ('express').Router();
const Pais = require('../models/Pais');
// const validarAdministrador = require('../middlewares/validarAdministrador');
// const { marcarFavorito } = require('../models/Producto');

// Manera 1
// router.use(validarAdministrador)

router.route('/')
  .get( Todos )
  .post( Crear )

router.route('/:id')
  .put( Actualizar )
  .delete( Borrar)
  .get( Uno )
  
router.route('/:id/ciudades')
  .get(Ciudades)

async function Todos (req, res) {
  let items = await Pais.Todos();  
  res.json(items)
}

async function Crear (req, res)  {
  try {
      const { name, region } = req.body;
      const result = await Pais.Crear(name.toLowerCase(), region);
      res.json({status: 200, message: 'recurso creado', data: result[0]});
    } catch (error) {
      console.error(error);
      res.json({status: 500, message: "Some error"})
    }
}

async function Borrar (req,res) {
    try {
      const {id} =req.params;
      const result = await Pais.Borrar(id);
      res.json({ status: 200, message: `ciudad ${id} eliminado`});  
  } catch (error) {
      console.error (error.message)
      res.json({status: 500, message: "Some error"})
  }
}

async function Uno (req, res) {
  try {
      let r = await Pais.Uno(req.params.id);  
      res.json(r)
  } catch (error) {
    console.error(error);
    res.json({status: 500, message: "Some error"})
  }
}

async function Actualizar (req, res) {
  const { nombre} =req.body;
  const { id } =req.params;
  let result = await Pais.Actualizar(id, nombre);
  result = await Pais.Uno(id);  
  res.json({status: 200, message: `Pais ${id} actualizado `, data: result});
}

async function Ciudades (req, res) {
  const { id } = req.params;
  let result = await Pais.Ciudades(id);
  res.json({status: 200, message: `ok`, data: result});
}
      
module.exports = router;