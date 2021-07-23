const sequelize = require('../conexion');

const Contacto = {};

const MODEL_NAME = "contacts"
const MODEL_NAME_2 = "canales"

Contacto.Crear = async (nombre,apellido, cargo,email, compania, ciudad, dir, interes)  => {
    try {
        const result = await sequelize.query(`
            INSERT INTO 
                ${MODEL_NAME} ( 
                    nombre, 
                    apellido, 
                    cargo,
                    email,
                    compania,
                    city,
                    dir,
                    interes
                )
            VALUES ( ?,  ?, ?, ?, ?, ?, ?, ? );
        `,
        {
            replacements: [nombre, apellido, cargo, email, compania, ciudad, dir, interes]
        }
        );
        
    console.log(result);
        return result;

    } catch (error) {
        console.log(error);
    }
};

Contacto.Actualizar= async (id, nombre, apellido, cargo, email, compania) => {
    const result = await sequelize.query(
        `
            UPDATE 
                ${MODEL_NAME}
            SET 
                nombre = ?, 
                apellido = ?, 
                cargo = ?,
                email = ?,
                compania = ?,
                interes = ?
            WHERE 
                id = ?;
        `,
        {
            replacements: [ nombre, apellido, cargo, email, compania, interes, id ]
        }
    )
    return result;
}

Contacto.Todos = async () => {
    const result = await sequelize.query(
        `
        SELECT 
            *
        FROM 
            ${MODEL_NAME}
        `,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Contacto.Borrar = async (id) => {
    const result = await sequelize.query(
        `DELETE FROM ${MODEL_NAME} WHERE id = ?;`, 
    {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE 
    });
    return result;
}

Contacto.CrearCanal = async (idContacto, canal, cuenta, preferencia)  => {
    try {
        const result = await sequelize.query(`
            INSERT INTO 
                ${MODEL_NAME_2} ( 
                    contacto, 
                    canal, 
                    cuenta, 
                    preferencia
                )
            VALUES ( ?,  ?, ?, ?);
        `,
        {
            replacements: [idContacto, canal, cuenta, preferencia]
        }
        );
        
    console.log(result);
        return result;

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
};

Contacto.ActualizarCanal= async (idContacto, canal, cuenta, preferencia) => {
    const result = await sequelize.query(
        `
            UPDATE 
                ${MODEL_NAME_2}
            SET 
                idContacto = ?, 
                canal = ?, 
                cuenta = ?, 
                preferencia = ?
            WHERE 
                id = ?;
        `,
        {
            replacements: [ idContacto, canal, cuenta, preferencia ]
        }
    )
    return result;
}

Contacto.Canales = async (idContacto) => {
    const result = await sequelize.query(
        `
        SELECT 
            *
        FROM 
            ${MODEL_NAME_2}
        WHERE
            contacto = ?
        `,
        { 
            type: sequelize.QueryTypes.SELECT,
            replacements: [ idContacto ]
        });
    return result;
}

Contacto.BorrarCanal = async (id) => {
    const result = await sequelize.query(
        `DELETE FROM ${MODEL_NAME_2} WHERE id = ?;`, 
    {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE 
    });
    return result;
}

module.exports = Contacto;