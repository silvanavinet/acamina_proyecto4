const sequelize = require('./../conexion');

const Producto = {};

//CREAR UN PRODUCTO
Producto.crear = async (nombre, url_foto, precio)  => {
    try {
        const result = await sequelize.query(`
        INSERT INTO productos ( nombre, url_foto,precio)
        VALUES ( ?,  ?, ?);`,
     {
        replacements: [nombre, url_foto, precio]
    });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// PARA OBTENER TODOS LOS PEDIDOS DEL SISTEMA (filas)
Producto.obtenerTodos = async () => {
    const result = await sequelize.query(
        `SELECT * FROM productos; `,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

// PARA ACTUALIZAR UN PRODUCTO 

Producto.actualizar= async (nombre, url_foto, precio, id) => {
    const result = await sequelize.query(
        `UPDATE productos
        SET nombre = ?, url_foto = ?, precio = ?
        WHERE id = ?;`,
        {
            replacements: [nombre, url_foto, precio, id]
        }
    )
    return result;
}


// PARA BORRAR 
Producto.borrar = async (id) => {
    const result = await sequelize.query(`DELETE FROM productos WHERE id = ?;`, 
    {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE 
    });
    return result;
}


//LISTAR FAVORITOS
Producto.favoritos = async (usuarioId) => {
    const result = await sequelize.query(`SELECT * FROM producto_favorito 
    INNER JOIN productos
    ON producto_favorito.productoId = productos.id
    WHERE usuarioId = ?
    `,
    {
        replacements: [usuarioId],
        type: sequelize.QueryTypes.SELECT
    } 
    )
    return result;
}
//INSERT INTO producto_favorito (usuarioId, productoId) VALUES (?, ?)
Producto.marcarFavorito = async (usuarioId, productoId) => {
    try {
        const result = await sequelize.query(`
        INSERT INTO producto_favorito (usuarioId, productoId)
        VALUES (?,?);`,
       { replacements: [usuarioId, productoId],
        type: sequelize.QueryTypes.INSERT
       }
        )
        return result;    
    } catch (error) {
        if (error.original.sqlMessage.indexOf("Duplicate") !== -1){
            return "Ya se añadio este producto a los favoritos"
        }
    }
}


module.exports = Producto;