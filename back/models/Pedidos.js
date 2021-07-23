const sequelize = require('./../conexion');

const Pedido = {};

//CREAR UN PEDIDO
Pedido.crear = async (forma_pago, estado_pedido, total, usuario_id)  => {
    try {
        const result = await sequelize.query(
            'INSERT INTO pedidos (forma_pago, estado_pedido, total, usuario_id) VALUES (?, ?, ?, ?)', 
            {
            replacements: [forma_pago, estado_pedido, total, usuario_id]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

//PARA RELACIONAR UN PRODUCTO CON UN PEDIDO
Pedido.relacionarProducto = async (pedido_id, producto_id, precio, cantidad) =>
{
    try {
        const result = await sequelize.query(`
        INSERT INTO pedido_producto (pedido_id, producto_id, precio, cantidad) VALUES (?, ?, ?, ?)`, 
        {
            replacements: [pedido_id, producto_id, precio, cantidad]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }

}

// PARA OBTENER TODOS LOS PEDIDOS DEL SISTEMA
Pedido.obtenerTodos = async () => {
    const result = await sequelize.query(
        `SELECT 
                    pedidos.estado_pedido, 
                    pedidos.id, 
                    pedidos.total, 
                    pedidos.forma_pago, 
                    usuario.nombre_apellido, 
                    usuario.direccion_envio 
        FROM 
                    pedidos 
            JOIN    usuario 
            ON      usuario.id = pedidos.usuario_id
        `,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Pedido.obtenerPorId = async (id) => {
    const result = await sequelize.query(`
        SELECT 
                    pedidos.estado_pedido, 
                    pedidos.id, 
                    pedidos.total, 
                    pedidos.forma_pago, 
                    usuario.nombre_apellido, 
                    usuario.direccion_envio 
        FROM 
                    pedidos 
            JOIN    usuario 
            ON      usuario.id = pedidos.usuario_id 
        WHERE       pedidos.id = ?
            `,
        { 
            replacements:[id], 
            type: sequelize.QueryTypes.SELECT 
        }
    );

    return result[0];  
}

// PARA VER LOS DETALLES DEL PEDIDO
Pedido.obtenerDetalle = async (id_pedido) => {
    const result = await sequelize.query(`
            SELECT 
                productos.nombre, 
                productos.url_foto, 
                productos.precio, 
                pedido_producto.cantidad 
            FROM 
                pedido_producto 
            JOIN 
                productos 
            ON  
                productos.id = pedido_producto.producto_id 
            WHERE 
                pedido_producto.pedido_id = ?`,
    { 
        replacements: [id_pedido],
        type: sequelize.QueryTypes.SELECT 
    });
return result;

}

Pedido.actualizarEstado = async (id_pedido, estado_pedido) => {
    try {
        const result = await sequelize.query('UPDATE pedidos SET estado_pedido = ?  WHERE id = ?', {
            replacements: [estado_pedido, id_pedido]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Pedido.borrar = async(id) =>{
    try {

        const result = await sequelize.query('DELETE FROM pedidos WHERE id=?',{
            replacements: [id],
            type: sequelize.QueryTypes.DELETE    
        })

        return "Pedido borrado con exito"


        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = Pedido;