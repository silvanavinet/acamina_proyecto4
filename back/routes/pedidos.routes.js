// const { route } = require('./usuarios.routes');

const router = require ('express').Router();
const validarAdministrador = require('../middlewares/validarAdministrador')
const Pedido = require('../models/Pedidos');

router.route('/')
.get(
    validarAdministrador, 
    async (req,res) => {
        let pedidos = await Pedido.obtenerTodos();  

        pedidos = await Promise.all(
            pedidos.map (async pedido => {
                const detalles = await Pedido.obtenerDetalle(pedido.id);
                pedido.detalle= detalles; 
                return pedido;
        })
        );
        res.json(pedidos);
    }
)

.post( async (req,res) =>  {
    const { id_usuario, forma_pago, total, productos } =req.body;
    const result = await Pedido.crear(forma_pago, 'Nuevo', total, id_usuario);
    
    productos.forEach( producto => {
        Pedido.relacionarProducto(result[0], producto.id, producto.precio, producto.cantidad);
    });
    res.json('ok');
})


router.route('/:id')
    .get(async (req, res) => {
        const idPedido = req.params.id;
        let pedido = await Pedido.obtenerPorId(idPedido);  
        
        if (!pedido){
            return res.json("Pedido no existe en la base de datos")
        }

        pedido.detalle = await Pedido.obtenerDetalle(pedido.id);
        res.json(pedido);
    
    })

    .put(async(req, res) => {
        const idPedido = req.params.id;
        const { estadoNuevo } = req.body;
        Pedido.actualizarEstado(idPedido, estadoNuevo);
        res.json('El pedido ' + idPedido + 'se cambio al estado' + estadoNuevo);
    })
    .delete(
        validarAdministrador,
        async(req, res)=>{
            const id = req.params.id;
            const result = await Pedido.borrar(id);
            res.json(result);
        }
    )

module.exports = router;
