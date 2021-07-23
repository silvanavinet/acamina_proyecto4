const router = require ('express').Router();
const Ciudad = require('../models/Ciudad');
// const validarAdministrador = require('../middlewares/validarAdministrador');
// const { marcarFavorito } = require('../models/Producto');

// Manera 1
// router.use(validarAdministrador)

router.route('/')
  .get( 
    async (req,res) => {
        let ciudad = await Ciudad.Todos();  
        res.json(ciudad)
    })

    .post(
        async(req, res) =>  {
            try {
                const { name, country } = req.body;
                const result = await Ciudad.Crear(name.toLowerCase(), country);
                console.log(result);
                res.json({status: 200, message: 'recurso creado', data: result[0]});
              } catch (error) {
                console.error(error);
                res.json({status: 500, message: "Some error"})
              }
    })

router.route('/:id')
  .put( 
      async(req,res) => {
          const { nombre, url_foto, precio } =req.body;
          const {id} =req.params;
          // const result = await Producto.actualizar(nombre, url_foto, precio, id);
          res.json("recurso actualizado");
      })
      
  .delete(
      async(req,res) => {
        try {
            const {id} =req.params;
            const result = await Ciudad.Borrar(id);
            res.json({ status: 200, message: `ciudad ${id} eliminado`});  
        } catch (error) {
            console.error (error.message)
            res.json({status: 500, message: "Some error"})
        }
      }
    )
.get(Uno)

async function Uno (req, res) {
    try {
        let ciudad = await Ciudad.Uno(req.params.id);  
        res.json(ciudad)
    } catch (error) {
        
    }
}
      
module.exports = router;