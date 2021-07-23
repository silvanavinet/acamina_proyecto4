const router = require ('express').Router();
const Region = require('../models/Region');
// const validarAdministrador = require('../middlewares/validarAdministrador');
// const { marcarFavorito } = require('../models/Producto');

// Manera 1
// router.use(validarAdministrador)

router.route('/').get(Todos).post(Crear)

router.route('/:id')
  .put( 
      async(req,res) => {
          try {
            const {name} = req.body;
            const {id} = req.params;
            const result = await Region.Actualizar(id, name);

            if (!result) 
              throw new Error("Algo salio mal")

            res.json({status: 200, message: 'Recurso actualizado'});
          } catch (error) {
            console.error(error);
            res.json({status: 500, message: error.message})
          }
      })
      
  .delete(
      async(req,res) => {
          try {
            const {id} =req.params;
            const result = await Region.Borrar(id);
            res.json({status: 200, message: 'Recurso borrado'});
          } catch (error) {
            console.error(error);
            res.json({status: 500, message: "Some error"})
          }
      })
  .get(Uno)

router.route('/:id/paises')
      .get(Paises)

async function Crear (req, res) {
  try {
    const { name } = req.body;
    const result = await Region.Crear(name.toLowerCase());
    res.json({status: 200, message: 'recurso creado', data: result[0]});
  } catch (error) {
    console.error(error);
    res.json({status: 500, message: "Some error"})
  }
}

async function Todos (req, res) {
  try {
    let items = await Region.Todos(); 

    const response = {}
    const uniqRegiones = [...new Set(items.map(i => i.region))]
    const regions = uniqRegiones.map(
      r => {
        let eRegion = items.find( i => i.region === r)
        return { 
          id: eRegion.idRegion, 
          name: eRegion.region,
          countrys: []
        }
      }
    )
    response.values = uniqRegiones
    response.regions = regions

    for (const region of uniqRegiones) {
      
      let uniqPaises = items.filter( i => i.region === region && i.country !== null ).map( i =>  i.country)
      uniqPaises = [... new Set(uniqPaises)]
      let paises = uniqPaises.map(
        p => {
          let ePais = items.find( i => i.country === p)
          return { 
            id: ePais.idCountry, 
            name: ePais.country,
            citys: []
          }
        }
      )

      const tmpRegion = response.regions.find( r => r.name === region)
      tmpRegion.values = uniqPaises
      tmpRegion.countrys = paises

      for ( const pais of uniqPaises ) {
        let uniqCiudades = items.filter( i => i.country === pais && i.city !== null ).map( i =>  i.city)
        uniqCiudades = [... new Set(uniqCiudades)]
        let ciudades = uniqCiudades.map(
          c => {
            let eCiduad = items.find( i => i.city === c)
            console.log("eCiduad", eCiduad);
            return { 
              id: eCiduad.idCity, 
              name: eCiduad.city,
            }
          }
        )

        const tmpCountry = response
          .regions.filter( r => r.name === region)[0]
          .countrys
          .find( c => c.name === pais )

        tmpCountry.values = uniqCiudades
        tmpCountry.citys = ciudades

      }
    }

    res.json(response);
    res.json({status: 200, message: 'recurso creado', response});
  } catch (error) {
    console.error(error);
    res.json({status: 500, message: "Some error"})
  }
}

async function Uno (req, res) {
  try {
      let r = await Region.Uno(req.params.id);  
      res.json(r)
  } catch (error) {
      
  }
}

async function Paises (req, res) {
  try {
    const { id } = req.params;
    let result = await Region.Paises(id);
    res.json({status: 200, message: `ok`, data: result});
  } catch (error) {
    console.error(error);
    res.json({status: 500, message: "Some error"})
  }
}

module.exports = router;