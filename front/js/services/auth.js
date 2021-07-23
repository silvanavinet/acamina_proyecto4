const api_url = "http://localhost:3000/api"
const uri = "usuarios"

async function Login(email, contrasena) {

  const body  = JSON.stringify({
    email,
    contrasena
  });

  const headers = {
    'Content-Type': 'application/json'
  };

  try {
      const response = await fetch(
        `${api_url}/${uri}/login`,
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

async function IsAdminService() {

  const headers = {
    'Content-Type': 'application/json'
  };

  const bearer = JSON.parse( localStorage.getItem( "access_token") )
  headers.Authorization = `Bearer ${bearer}`


  try {
      const response = await fetch(
        `${api_url}/${uri}/admin`,
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