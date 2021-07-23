const uri_r = "regiones"

async function TodosRegionService(nombre) {

  const body  = JSON.stringify({
    name: nombre,
  });

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_r}/`,
        {
          method: 'GET',
          headers
      }
      )
      const jObject = await response.json()
      return jObject
  } catch (error) {
      console.error(error);
  }
}

async function CrearRegionService(nombre) {

  const body  = JSON.stringify({
    name: nombre,
  });

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_r}/`,
          {
            method: 'POST',
            headers,
            body 
        }
      )
      const jObject = await response.json()
      return jObject
  } catch (error) {
      console.error(error);
  }
}

async function UnoRegionService(id){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`
  
  try {
      const response = await fetch(
        `${api_url}/${uri_r}/${id}`,
          {
            method: 'GET',
            headers,
        }
      )
      const jObject = await response.json()
      return jObject
  } catch (error) {
      console.error(error);
  }
}

async function RegionPaisesService(id){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_r}/${id}/paises`,
          {
            method: 'GET',
            headers,
        }
      )
      const jObject = await response.json()
      return jObject
  } catch (error) {
      console.error(error);
  }
}