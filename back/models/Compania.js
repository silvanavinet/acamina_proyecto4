const sequelize = require('../conexion');

const Compania = {};

const MODEL_NAME = "companys"

Compania.Crear = async (nombre, pais, direccion, tel, email)  => {
    try {
        const result = await sequelize.query(`
            INSERT INTO 
                ${MODEL_NAME} ( 
                    name, 
                    city, 
                    dir,
                    tel,
                    email
                )
            VALUES ( ?,  ?, ?, ?, ? );
        `,
        {
            replacements: [nombre, pais, direccion, tel, email]
        }
        );
        
        console.log(result);
        return result;

    } catch (error) {
        console.log(error);
    }
};

Compania.Todos = async () => {
    const result = await sequelize.query(
        `
        SELECT 
            companys.id, 
            dir, 
            email, 
            tel, 
            companys.name, 
            citys.name as city, 
            countrys.name as country,  
            regions.name as region
        FROM 
            companys
        INNER JOIN 
                citys
            ON
                companys.city = citys.id
        INNER JOIN 
                countrys
            ON
                countrys.id = citys.country
        INNER JOIN 
                regions
            ON
                regions.id = countrys.region
        `,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Compania.Uno = async (id) => {
    const result = await sequelize.query(
        `
        SELECT 
            companys.id, 
            dir, 
            email, 
            tel, 
            companys.name, 
            citys.name as city, 
            citys.id as idCity, 
            countrys.name as country,  
            regions.name as region
        FROM 
            companys
        INNER JOIN 
                citys
            ON
                companys.city = citys.id
        INNER JOIN 
                countrys
            ON
                countrys.id = citys.country
        INNER JOIN 
                regions
            ON
                regions.id = countrys.region
        WHERE 
            companys.id = ?
        `,
        { type: sequelize.QueryTypes.SELECT,
            replacements: [ id ] 
        }
    );
    return result[0];
}

Compania.Actualizar= async (id, nombre, ciudad, direccion, tel, email) => {
    const result = await sequelize.query(
        `
            UPDATE 
                ${MODEL_NAME}
            SET 
                name = ?, 
                city = ?, 
                dir = ?,
                tel = ?,
                email = ?
            WHERE 
                id = ?;
        `,
        {
            replacements: [ nombre, ciudad, direccion, tel, email, id ]
        }
    )
    return result;
}

Compania.Borrar = async (id) => {
    const result = await sequelize.query(
        `DELETE FROM ${MODEL_NAME} WHERE id = ?;`, 
    {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE 
    });
    return result;
}

module.exports = Compania;