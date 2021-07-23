const uri_comp = "companias"

async function CompaniaCrearService(
  nombre,
  ciudad, 
  direccion,
  email,
  tel
  ){

  const body  = JSON.stringify({
    nombre,
    ciudad,
    direccion,
    email,
    tel
});

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_comp}/`,
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

async function CompaniaGuardarService(
  id,
  nombre,
  ciudad, 
  direccion,
  email,
  tel
  ){

  const body  = JSON.stringify({
    nombre,
    ciudad,
    direccion,
    email,
    tel
});

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_comp}/${id}`,
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

async function CompaniaTodosService(){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_comp}/`,
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

async function CompaniaUnoService(id){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_comp}/${id}`,
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

async function CompaniaBorrarService(id) {

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_comp}/${id}`,
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