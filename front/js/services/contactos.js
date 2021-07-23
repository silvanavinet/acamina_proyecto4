const uri_cont = "contactos"

async function ContactoCrearService(
  nombre,
  apellido,
  cargo,
  email,
  compania,
  ciudad,
  dir,
  interes
  ){

  const body  = JSON.stringify({
    nombre,
    apellido,
    cargo,
    email,
    compania,
    ciudad,
    dir,
    interes
  });

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_cont}/`,
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

async function ContactoGuardarService(
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
        `${api_url}/${uri_cont}/${id}`,
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

async function ContactoTodosService(){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_cont}/`,
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

async function ContactoUnoService(id){

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_cont}/${id}`,
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

async function ContocaoBorrarService(id) {

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`

  try {
      const response = await fetch(
        `${api_url}/${uri_cont}/${id}`,
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