const sequelize = require('../conexion');

const Pais = {};

const MODEL_NAME = "countrys"

//CREAR UN PRODUCTO
Pais.Crear = async (name, region)  => {
    try {
        const result = await sequelize.query(`
        INSERT INTO ${MODEL_NAME} ( name, region ) VALUES ( ?, ? );`,
     {
        replacements: [name, region]
    });
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error ("Error al insertar un pais")
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

    console.log(result);
    return result[0][0];
}

// PARA ACTUALIZAR UN PRODUCTO 

Pais.Actualizar= async (id, name) => {
    const result = await sequelize.query(
        `UPDATE ${MODEL_NAME} SET name = ? WHERE id = ?;`,
        {
            replacements: [name, id]
        },
        {type: sequelize.QueryTypes.UPDATE }
    )
    return result[0];
}


// PARA BORRAR 
Pais.Borrar = async (id) => {
    const result = await sequelize.query(`
    DELETE FROM ${MODEL_NAME} WHERE id = ?;`, 
    {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE 
    });
    return result;
}

Pais.Ciudades = async (id) => {
    const result = await sequelize.query(
        `SELECT *
        FROM citys
        WHERE country = ?; `,
        {
            replacements: [id]
        },
        { 
            type: sequelize.QueryTypes.SELECT 
        }
        );

    console.log(result);
    return result[0];
}


module.exports = Pais;