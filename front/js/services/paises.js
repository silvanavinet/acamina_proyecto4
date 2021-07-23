
const uri_p = "paises"

async function CrearPaisService(nombre, parentId) {

  const body  = JSON.stringify({
    name: nombre,
    region: parentId
  });

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_p}/`,
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

async function GuardarPaisService(id, nombre){

  const body  = JSON.stringify({
    nombre
  });

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_p}/${id}`,
          {
            method: 'PUT',
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

async function UnoPaisService(id){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_p}/${id}`,
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

async function BorrarPaisService(id) {

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_p}/${id}`,
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

async function TodosPaisesService(id){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_p}/`,
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

async function PaisCiudadesService(id){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_p}/${id}/ciudades`,
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