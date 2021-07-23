// Formulario Agregar Region ///////////////////////////////////////////////
const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("form-login-email");
const inputContrasena = document.getElementById("form-login-contrasena");
const btnIngresar = document.getElementById("form-button-ingresar");

formLogin.addEventListener("click", function(event){
  event.preventDefault()
});

btnIngresar.addEventListener("click", async () => {
  let contrasena = inputContrasena.value
  let email = inputEmail.value

  if (!contrasena || !email){
    alert("Debes ingresar tu email y contraseña para entrar!")
    return 0
  }

  const result = await Login(email, contrasena)

  if (!result || !result.access_token){
    alert("Ups! Algo salio mal")
    return 0
  }
    
  const admin = await IsAdminService()
  if(!admin || admin.status === 401 ) 
  {
    alert("Ups! Algo salio mal")
    return 0
  }


  localStorage.setItem( "access_token", JSON.stringify(result.access_token))
  localStorage.setItem( "is_admin", JSON.stringify(admin.permission))

  window.location.href = "./contactos.html";
})

