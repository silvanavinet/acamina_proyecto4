const router = require ('express').Router();
const Producto = require('../models/Producto');
const validarAdministrador = require('../middlewares/validarAdministrador');
const { marcarFavorito } = require('../models/Producto');

// Manera 1
// router.use(validarAdministrador)

router.route('/')
.get( 
    async (req,res) => {
        let producto = await Producto.obtenerTodos();  
        res.json(producto);
    })

.post(
    validarAdministrador,
    async(req,res) =>  {
        const { nombre, url_foto, precio} =req.body;
        const result = await Producto.crear(nombre, url_foto, precio);
        res.json('ok');
})

// /api/productos
router.route('/:id')
.put( 
    validarAdministrador,
    async(req,res) => {
        const {nombre, url_foto, precio} =req.body;
        const {id} =req.params;
        const result = await Producto.actualizar(nombre, url_foto, precio, id);
        res.json(result);
    })
    
.delete(
    validarAdministrador,
    async(req,res) => {
        const {id} =req.params;
        const result = await Producto.borrar(id);
        res.json(result);
    })

router.route('/:id/marcar_favorito')
.post (async (req,res) => {
    console.log(req.user.usuario);
    const usuarioId = req.user.usuario.id
    const {id } =req.params;
    const result = await Producto.marcarFavorito(usuarioId, id)
    res.json(result);

})

router.route('/favoritos')
    .get( async (req,res) => {
        console.log(req.user);
        const {id} = req.user.usuario
        // let {id} = req.params;
        const result = await Producto.favoritos(id);  
        res.json(result);
        // res.json("ok");
    })


      
module.exports = router;