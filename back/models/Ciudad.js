const sequelize = require('../conexion');

const Pais = {};

const MODEL_NAME = "citys"

//CREAR UN PRODUCTO
Pais.Crear = async (name, country)  => {
    try {
        const result = await sequelize.query(`
        INSERT INTO ${MODEL_NAME} ( name, country ) VALUES ( ?, ? );`,
     {
        replacements: [name, country]
    });
        return result;
    } catch (error) {
        console.error(error);
    }
};

// PARA OBTENER TODOS LOS PEDIDOS DEL SISTEMA (filas)
Pais.Todos = async () => {
    const result = await sequelize.query(
        `SELECT * FROM ${MODEL_NAME}; `,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Pais.Uno = async (id) => {
    const result = await sequelize.query(
        `SELECT * FROM ${MODEL_NAME} WHERE id = ?; `,
        {
            replacements: [id]
        },
        { 
            type: sequelize.QueryTypes.SELECT 
        }
        );
    return result[0][0];
}

// PARA ACTUALIZAR UN PRODUCTO 

Pais.Actualizar= async (nombre, url_foto, precio, id) => {
    const result = await sequelize.query(
        `UPDATE ${MODEL_NAME} SET nombre = ?, url_foto = ?, precio = ? WHERE id = ?;`,
        {
            replacements: [nombre, url_foto, precio, id]
        }
    )
    return result;
}


// PARA BORRAR 
Pais.Borrar = async (id) => {
    console.log("ID", id);
    try {
        const result = await sequelize.query(`
        DELETE FROM ${MODEL_NAME} WHERE id = ?;`, 
        {
            replacements: [id],
            type: sequelize.QueryTypes.DELETE 
        });
        return result;
    } catch (error) {
        console.error(error.message)
        throw new Error("Error al borrar ciudad")
    }
}


module.exports = Pais;