
const uri_c = "ciudades"

async function CrearCiudadesService(nombre, parentId) {

  const body  = JSON.stringify({
    name: nombre,
    country: parentId
  });

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_c}/`,
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

async function BorrarCiudadesService(id) {

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_c}/${id}`,
          {
            method: 'DELETE',
            headers,
        }
      )
      const jObject = await response.json()
      return jObject
  } catch (error) {
      console.error(error);
  }
}

async function UnoCiudadesService(id){
  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`
  
  try {
      const response = await fetch(
        `${api_url}/${uri_c}/${id}`,
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

async function TodosCuidadesService () {
  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_c}/`,
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