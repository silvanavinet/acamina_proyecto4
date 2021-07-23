const formContactoCreate = document.getElementById("form-contactos-create")
formContactoCreate.addEventListener("click", function(event){ event.preventDefault() });

const btnFormContactoMostrar = document.getElementById("btn-contacto-create-mostrar")
btnFormContactoMostrar.addEventListener( "click", FormCreateContactoShow );

const btnFormContactoCancelar = document.getElementById("btn-contacto-create-cancelar")
btnFormContactoCancelar.addEventListener( "click", FormCreateContactoClose);

const btnContactoCrear = document.getElementById("btn-contacto-create")
btnContactoCrear.addEventListener( "click", ContactoCrear);

function FormCreateContactoClose () {
  formContactoCreate.style.display = "none"
}

async function FormCreateContactoShow () {
  formContactoCreate.style.display = "block"
  populateRegiones()
  populateCompanias()
}

// Formulario Crear Compañia
document.getElementById("frm-concrear-regions").addEventListener("change", populatePaisesListener);
document.getElementById("frm-concrear-pais").addEventListener("change", populateCiudadesListener);

async function populateRegiones () {

  let paisesList = document.getElementById("frm-concrear-regions")
  const {regions} = await TodosRegionService()
  paisesList.innerHTML = ""
  for (const r of regions ) {
    let value = JSON.stringify({ name: r.name, id: r.id })
    let paisEle = `<option value=${ value } >${r.name}</option>`
    paisesList.innerHTML += paisEle
  }

  populatePaises(regions[0].id)

  return regions[0]
}

async function populatePaisesListener (e) {
  const pais = JSON.parse(e.target.value)
  populatePaises(pais.id)
}

async function populatePaises(id) {
  
  const citiesElements = document.getElementById("frm-concrear-pais")
  const {data} = await RegionPaisesService(id)
  console.log("PAISES", data);
  citiesElements.innerHTML = ""
  
  for (const ciudad of data ) {
    let value = JSON.stringify({ name: ciudad.name, id: ciudad.id })
    let tmpCity = `<option value=${ value } >${ciudad.name}</option>`
    citiesElements.innerHTML += tmpCity
  }

  populateCiudades(data[0].id)

  return data[0]
}

async function populateCiudadesListener (e) {
  console.log("populateCiudades");
  const ciudad = JSON.parse(e.target.value)
  populateCiudades(ciudad.id)
}

async function populateCiudades(id) {
  const citiesElements = document.getElementById("frm-concrear-ciudad")
  const {data} = await PaisCiudadesService(id)
  console.log("ciudades", data, id);
  citiesElements.innerHTML = ""
  for (const ciudad of data ) {
    let value = JSON.stringify({ name: ciudad.name, id: ciudad.id })
    let tmpCity = `<option value='${ value }'>${ciudad.name}</option>`
    citiesElements.innerHTML += tmpCity
  }
}

async function populateCompanias () {
  const companiasElement = document.getElementById("frm-concrear-compania")
  const {data} = await CompaniaTodosService()
  console.log("companias", data);
  companiasElement.innerHTML = ""
  for (const comp of data ) {
    let value = JSON.stringify({ name: comp.name, id: comp.id })
    let tmpCity = `<option value=${ comp.id  } >${comp.name}</option>`
    companiasElement.innerHTML += tmpCity
  }
}

const canalesLista = document.getElementById("frm-lista-canales")
const btnAgregarCanal = document.getElementById("btn-agregar-canal")

btnAgregarCanal.addEventListener("click", () => {
  const count = canalesLista.childElementCount
  canalesLista.innerHTML += CanalElement( count + 1 )
})

const CanalElement = (count) => {
  const id = `canal-${count}`
  return `
    <li id="${id}">
    <label for="cars">Canal</label>
    <select id="frm-concrear-preference" name="cars">
      <option value="chile">Facebook</option>
      <option value="argentina">Instagram</option>
      <option value="colombia">Whatsapp</option>
      <option value="brasil">Linkedin</option>
    </select>
    <br>
    <label for="cars">Preferencia</label>
    <select id="frm-concrear-preference" name="cars">
      <option value="sin-preferencia">Sin preferencia</option>
      <option value="baja">Baja</option>
      <option value="media">Media</option>
      <option value="alta">Alta</option>
    </select>
    <p type="Cuenta de usuario:"><input placeholder="Escribe la cuenta de usuario del contacto."></input></p>
    <button onclick="deleteCanalElementFromList(${count - 1})" id="btn-contacto-create">Eliminar</button>
  </li>
  `
}

function deleteCanalElementFromList (index) {
  console.log(index, canalesLista.children);
  canalesLista.removeChild(canalesLista.childNodes[index])
  console.log(canalesLista.children);

}

async function ContactoCrear () {
  let fname = document.getElementById("frm-concrear-fname").value
  let lname = document.getElementById("frm-concrear-lname").value
  let rol = document.getElementById("frm-concrear-rol").value
  let compania = document.getElementById("frm-concrear-compania").value
  let email = document.getElementById("frm-concrear-email").value
  let city =  JSON.parse(document.getElementById("frm-concrear-ciudad").value).id
  let dir = document.getElementById("frm-concrear-dir").value
  let interes = document.getElementById("frm-concrear-interest").value

  const canales = document.getElementById("frm-lista-canales")
  console.log(canales.childNodes);
  console.log(canales.children);
  for (const canal of canales.children) {
    const selects = Array.from(canal.getElementsByTagName("select"))
    const canalSelect = selects.find( s => s.name === "canal")
    const prefSelect = selects.find( s => s.name === "prefer")
    const account = Array.from(canal.getElementsByTagName("input"))[0].value
  }


  if(!fname){ alert("Falta el campo: nombre"); return }
  if(!lname){ alert("Falta el campo: apellido"); return }
  if(!rol){ alert("Falta el campo: rol"); return }
  if(!compania){ alert("Falta el campo: compania"); return }
  if(!email){ alert("Falta el campo: email"); return }
  if(!city){ alert("Falta el campo: city"); return }
  if(!dir){ alert("Falta el campo: dir"); return }

  const contacto = await ContactoCrearService(
    fname,
    lname, 
    rol,
    email,
    compania,
    city,
    dir,
    interes
  )

  if (contacto.status !== 200){
    alert("Ups algo salio mal")
    return 0
  }

  FormCreateContactoClose()


}