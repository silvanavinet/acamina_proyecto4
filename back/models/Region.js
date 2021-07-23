const sequelize = require('../conexion');

const Region = {};

const MODEL_NAME = "regions"

Region.Crear = async (name)  => {
    try {
        const result = await sequelize.query(
            `INSERT INTO ${MODEL_NAME} ( name ) VALUES ( ? );`,
        {
            replacements: [name]
        });
        console.log("result", result);
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error ("Error al insertar una region")
    }
};

Region.Todos = async () => {
    const result = await sequelize.query(
        `
        SELECT 
            r.name as region, 
            r.id as idRegion, 
            c.name as country, 
            c.id as idCountry, 
            c2.name as city,
            c2.id as idCity
        FROM 
            regions as r 
                LEFT JOIN 
                    countrys as c 
                ON 
                    r.id = c.region
                LEFT JOIN 
                    citys as c2 
                ON 
                    c.id = c2.country;
        `,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Region.Uno = async (id) => {
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

Region.TraerPorNombe = async (nombre) => { 
    const result = await sequelize.query(
        `SELECT r.name as region, c.name as country, c2.name as city
        FROM regions as r 
            LEFT JOIN countrys as c ON r.id = c.region
            LEFT JOIN citys as c2 ON c.id = c2.country;`,
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Region.Actualizar= async ( id, name ) => {
    const result = await sequelize.query(
        `UPDATE ${MODEL_NAME} SET name = ? WHERE id = ?;`,
        {
            replacements: [name, id]
        }
    )
    return result;
}

Region.Borrar = async (id) => {
    const result = await sequelize.query(`
    DELETE FROM ${MODEL_NAME} WHERE id = ?;`, 
    {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE 
    });
    return result;
}

Region.Paises = async (id) => {
    const result = await sequelize.query(
        `SELECT *
        FROM countrys
        WHERE region = ?; `,
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


module.exports = Region;