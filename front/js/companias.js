// Abrir y cerrar Formulario Agregar Compañia

const formCompaniasCreate = document.getElementById("form-companias-create")
formCompaniasCreate.addEventListener("click", function(event){ event.preventDefault() });

const btnShowCompaniasAgregar = document.getElementById("btn-show-agregar-companias")
btnShowCompaniasAgregar.addEventListener( "click", showFormCompaniaAgregar );

const btnFormCompCancelar = document.getElementById("frm-compagregar-cancelar")
btnFormCompCancelar.addEventListener( "click", CancelFormCreateCompania);

const btnCompCrear = document.getElementById("frm-compagregar-create")
btnCompCrear.addEventListener( "click", CompaniaCrear);

function CancelFormCreateCompania () {
  formCompaniasCreate.style.display = "none";
}

async function showFormCompaniaAgregar () {
  formCompaniasCreate.style.display = "block";
  let paises = document.getElementById("finput-compcreate-country")
  await populatePaises (paises)
  // await populateCiudades (ciudades, )
}

// Formulario Crear Compañia
document.getElementById("finput-compcreate-country").addEventListener("change", populateCiudades);

async function populatePaises (parentElement) {
  const paises = await TodosPaisesService()
  parentElement.innerHTML = ""
  for (const pais of paises ) {
    let value = JSON.stringify({ name: pais.name, id: pais.id })
    let paisEle = `<option value=${ value } >${pais.name}</option>`
    parentElement.innerHTML += paisEle
  }
}

async function populateCiudades(e) {
  const pais = JSON.parse(e.target.value)
  const citiesElements = document.getElementById("finput-compcreate-city")
  const {data} = await PaisCiudadesService(pais.id)
  citiesElements.innerHTML = ""
  for (const ciudad of data ) {
    let value = JSON.stringify({ name: ciudad.name, id: ciudad.id })
    let tmpCity = `<option value=${ value } >${ciudad.name}</option>`
    citiesElements.innerHTML += tmpCity
  }
}

async function CompaniaCrear () {
  let nombre = document.getElementById("finput-compcreate-name").value
  // let pais = JSON.parse(document.getElementById("finput-compcreate-country").value)
  let ciudad = JSON.parse(document.getElementById("finput-compcreate-city").value)
  let dir = document.getElementById("finput-compcreate-dir").value
  let email = document.getElementById("finput-compcreate-email").value
  let tel = document.getElementById("finput-compcreate-tel").value

  if(!nombre){ alert("Debes ingresar un nombre de compañia"); return }
  if(!ciudad){ alert("Debes ingresar un nombre de ciudad"); return }
  if(!dir) { alert("Debes ingresar un nombre de dirección"); return }
  if(!email) { alert("Debes ingresar un nombre de email"); return }
  if(!tel) { alert("Debes ingresar un nombre de tel"); return }

  const nuevaComp = await CompaniaCrearService(nombre, ciudad.id, dir, email, tel)

  if (nuevaComp.status !== 200){
    alert("Ups algo salio mal")
    return 0
  }

  CancelFormCreateCompania()
  CompaniesTableRefresh()
}

// Tabla Companias

const tableCompanias = document.getElementById("table-companias")

async function CompaniesTableRefresh () {
  tableCompanias.innerHTML = ""
  tableCompanias.innerHTML += CompaniesTableHeader()

  const companias = await CompaniaTodosService()

  for (const company of companias.data){
    tableCompanias.innerHTML += CompaniesTableRow(company)
  }
}

function CompaniesTableHeader () {
  return `
  <tr>
  <th>Nombre</th>
  <th>Pais</th>
  <th>Dirección</th>
  <th>Email</th>
  <th>Teléfono</th>
  <th>Ciudad</th>
</tr>`
}

function CompaniesTableRow (compania) {
  const row = `
  <tr>
    <td>${compania.name}</td>
    <td>${compania.country}</td>
    <td>${compania.dir} </td>
    <td>${compania.email}</td>
    <td>${compania.tel}</td>
    <td>${compania.city}</td>
    <td>
      <button class="tabla" onclick="showFormCompaniaEdit('${compania.id}')">Editar</button>
      <button class="tabla" onclick="TableRowDelete('${compania.id}')">Eliminar</button>
    </td>
  </tr>
  `

  return row
}

function TableRowDelete (id) {
  const res = confirm("Seguro quieres eliminar esta compañia ?")

  if (res === false){
    return 0
  }

  CompaniaBorrarService(id)
  CompaniesTableRefresh()
}

CompaniesTableRefresh()

// Abrir y cerrar Formulario Edit Compañia

const formCompaniasEdit = document.getElementById("form-companias-edit")
formCompaniasEdit.addEventListener("click", function(event){ event.preventDefault() });

const btnFormCompEditCancelar = document.getElementById("frm-compedit-cancelar")
btnFormCompEditCancelar.addEventListener( "click", CancelFormEditCompania);

const btnCompEditGuarar = document.getElementById("frm-compedit-guardar")
btnCompEditGuarar.addEventListener( "click", CompaniaGuardar);

let currentIdCompany = null

function CancelFormEditCompania () {
  formCompaniasEdit.style.display = "none";
}

async function showFormCompaniaEdit (id) {
  formCompaniasEdit.style.display = "block";

  const {data} = await CompaniaUnoService(id)
  currentIdCompany = id

  document.getElementById("finput-compedit-name").value = data.name
  document.getElementById("finput-compedit-country").value = data.country
  document.getElementById("finput-compedit-city").value = data.city
  document.getElementById("finput-compedit-dir").placeholder = data.dir
  document.getElementById("finput-compedit-email").placeholder = data.email
  document.getElementById("finput-compedit-tel").placeholder = data.tel
}

async function CompaniaGuardar () {
  const {data} = await CompaniaUnoService(currentIdCompany)
  let nombre = document.getElementById("finput-compedit-name").value
  let dir = document.getElementById("finput-compedit-dir").value
  let email = document.getElementById("finput-compedit-email").value
  let tel = document.getElementById("finput-compedit-tel").value

  if(!dir) { alert("Debes ingresar un nombre de dirección"); return }
  if(!email) { alert("Debes ingresar un nombre de email"); return }
  if(!tel) { alert("Debes ingresar un nombre de tel"); return }

  const comp = await CompaniaGuardarService(
    currentIdCompany, 
    nombre, 
    data.idCity, 
    dir, 
    email, 
    tel
  )

  CancelFormEditCompania ()
  CompaniesTableRefresh()

}