const sequelize = require('./../conexion');
const Usuario = {};

const MODEL_NAME = "usuarios"

Usuario.Crear = async ( nombre, apellido, email, contrasena, perfil )  => {
    try {
        const result = await sequelize.query(`
            INSERT INTO 
            usuarios ( 
                nombre,
                apellido,
                email,
                contrasena,
                perfil 
            ) 
            
            VALUES ( ?, ?, ?, ?, ?)`,
          {
            replacements:[ 
              nombre,
              apellido,
              email,
              contrasena,
              perfil 
            ]
            }
        )
        return result;
    } catch (error) {
        console.log(error);
    }
};

Usuario.Todos = async () => {
    const result = await sequelize.query(`
        SELECT 
            *
        FROM ${MODEL_NAME}
        `,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Usuario.Uno = async (id) => {
    const result = await sequelize.query(`
        SELECT *
        FROM ${MODEL_NAME}
        WHERE id = ?`,
        { 
            replacements: [id],
            type: sequelize.QueryTypes.SELECT 
        });
    return result[0];
}

Usuario.Actualizar = async (
    id,
    contrasena,
    perfil 
    ) => {
    try {
        let result = await sequelize.query(
            `
            UPDATE 
                ${MODEL_NAME} 
            SET 
                contrasena = ?,
                perfil = ? 
            WHERE 
                id = ?
                `, {
            replacements: [ 
                contrasena,
                perfil,
                id 
            ],
        });
        
        result = await sequelize.query(`
            SELECT *
            FROM ${MODEL_NAME}
            WHERE id = ?`,
        { 
            replacements: [id],
            type: sequelize.QueryTypes.SELECT 
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

Usuario.Borrar = async (id) => {
    const result = await sequelize.query(
        `DELETE FROM ${MODEL_NAME} WHERE id = ?`, {
        replacements: [id]
    });
    return result;
}

module.exports = Usuario;