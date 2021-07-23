
// Arbol de Regiones ///////////////////////////////////////////////
var arbol = document.getElementById("myUL")
/////////////////////////////////////////////////

var listaSeleccionada = null
let zoneId = null

// REGION
const formRegionAgregar = document.getElementById("form-region-agregar");
formRegionAgregar.addEventListener("click", function(event){
  event.preventDefault()
});

const showFormRegion = document.getElementById("agregarregion");
showFormRegion.addEventListener("click", () => {
  document.getElementById("form-region-agregar").style.display = "block";
});

const btnACancelarRegion = document.getElementById("agregarregion1.1");
btnACancelarRegion.addEventListener("click", CancelarFormRegion);

const alertaCrearRegion = document.getElementById("agregarregion1");
alertaCrearRegion.addEventListener("click", formCrearRegion);

function CancelarFormRegion () {
  document.getElementById("form-region-agregar").style.display = "none";
}

async function formCrearRegion() {
  
  let input = document.getElementById("valor-crear-region");
  const regionData = await CrearRegionService(input.value)

  if (!regionData || regionData.status != 200) {
    alert("Ups, algo salio mal.")
    return 0
  }

  const region = await UnoRegionService(regionData.data)

  CancelarFormRegion()
  regionDisplay(region)

}

function regionDisplay (region) {
  const regionEle = Region (region)
  arbol.innerHTML = arbol.innerHTML + regionEle.regionEle
  updateCaret()

  return regionEle.idLista
}

function Region (region) {
  const idLista = "region-ul-" + region.name
  const regionEle = `
  <li class="region-li">
  <div class="caret tree-title-li">${region.name}
    <button id="agregarpais" onclick="showFormPaisAgregar('${idLista}', '${region.name}', ${region.id})">Agregar pais</button>
  </div>
  
  <ul id="${idLista}" class="nested">

  </ul>
</li>`
  return {regionEle, idLista}
}


// PAIS

var formPaisAgregar = document.getElementById("form-pais-agregar");
formPaisAgregar.addEventListener("click", function(event){
  event.preventDefault()
});

var formPaisEditar = document.getElementById("form-pais-editar");
formPaisEditar.addEventListener("click", function(event){
  event.preventDefault()
});

const botonCrearPais = document.getElementById("agregarpais")
botonCrearPais.addEventListener("click", formCrearPais);

const btnCancelarPaisAgregar = document.getElementById("agregarpais1.1");
btnCancelarPaisAgregar.addEventListener("click", () => {
  document.getElementById("form-pais-agregar").style.display = "none";
});

const botonGuardarPais = document.getElementById("editarpais")
botonGuardarPais.addEventListener("click", formGuardarPais);

const btnCancelarEditarPais = document.getElementById("editarpais1.1");
btnCancelarEditarPais.addEventListener("click", () => {
  document.getElementById("form-pais-editar").style.display = "none";
} );

function CancelarFormPais (){
  document.getElementById("form-pais-agregar").style.display = "none";
}

function CancelarFormPaisEditar (){
  document.getElementById("form-pais-editar").style.display = "none";
}

function showFormPaisAgregar(idLista, nombreRegion, idParent) {
  zoneId = idParent
  var formAgregarPais = document.getElementById("form-pais-agregar")
  formAgregarPais.style.display = "block"
  document.getElementById("add-pais-region-name").placeholder = nombreRegion
  listaSeleccionada = document.getElementById(idLista)
}

async function showEditarPais (lista, id) {
  const pais = await UnoPaisService(id)
  document.getElementById("valor-editar-pais").placeholder = pais.name;
  zoneId = id
  listaSeleccionada = document.getElementById(lista)
  formPaisEditar.style.display = "block"
}

async function formCrearPais () {
  var input = document.getElementById("valor-crear-pais");

  const paisData = await CrearPaisService(input.value, zoneId)

  if (!paisData || paisData.status != 200) {
    alert("Ups, algo salio mal.")
    return 0
  }

  const pais = await UnoPaisService(paisData.data)

  CancelarFormPais()
  paisDisplay(pais, listaSeleccionada.id)
  
}

async function formGuardarPais () {
  var input = document.getElementById("valor-editar-pais");

  const paisData = await GuardarPaisService( zoneId, input.value )

  if (!paisData || paisData.status != 200) {
    alert("Ups, algo salio mal.")
    return 0
  }

  CancelarFormPaisEditar()
  guardarPaisDisplay(paisData.data)
  
}

function paisDisplay (value, idLista) {
  const pais = Pais(value)
  lista = document.getElementById(idLista);
  lista.innerHTML = lista.innerHTML + pais.paisEle
  updateCaret()

  return pais.idLista
}

function Pais (pais){
  const idPais = "pais-" + pais.id
  const idLista = "pais-ul-" + pais.id
  const paisEle = `<li id="${idPais}">
  <div  class="caret tree-title-li "> <h4>${pais.name}</h4>
      <div class="ctrl-panel-child">
          <div class="ctrl-panel-child-cmpt-left">
              <button onclick="showEditarPais('${idLista}', ${pais.id})" id="editar">Editar</button>
              <button onclick="eliminarPais('${idLista}', ${pais.id})" id="borrar">Borrar</button>
          </div>
          <div class="ctrl-panel-child-cmpt-left">
              <button onclick="showFormCiudadAgregar('${idLista}', '${pais.name}', ${pais.id})" id="ciudad">Agregar ciudad</button>
          </div>                            
      </div>
  </div>
  <ul id="${idLista}" class="nested">
  </ul>   
</li>`
return { paisEle, idLista }
}

async function eliminarPais (idLista, id) {

  const resultDelete = await BorrarPaisService(id)

  if ( !resultDelete || resultDelete.status !== 200 ){
    alert("Ups hubo un error")
    return 0
  }

  var lista = document.getElementById(idLista).parentElement.parentElement;
  var lis = Array.from(lista.getElementsByTagName("li"))
  
  let index = -1;
  let i = 0
  for (let item of lis) {
    if (item.id === `pais-${id}`) 
      index = i;
    i++
  }

  lista.removeChild(lis[index])
}

async function guardarPaisDisplay (pais) {
  var lista = document.getElementById(`pais-${pais.id}`).parentElement.parentElement;
  var lis = Array.from(lista.getElementsByTagName("li"))
  
  let index = -1;
  let i = 0
  for (let item of lis) {
    if (item.id === `pais-${pais.id}`) 
      index = i;
    i++
  }
  
  lista.removeChild(lis[index])
  const c = lis[index].getElementsByTagName("h4")
  c.innerHTML = pais.name
  lista.adChild(lis[index])
}

// CIUDAD

const formCiudadAgregar = document.getElementById("form-ciudad-agregar");
formCiudadAgregar.addEventListener("click", function(event){
  event.preventDefault()
});

const formCiudadEditar = document.getElementById("form-ciudad-editar");
formCiudadEditar.addEventListener("click", function(event){
  event.preventDefault()
});

const botonCrearCiudad = document.getElementById("agregarciudad")
botonCrearCiudad.addEventListener("click", formCrearCiudad);

const btnCancelarCiudadAgregar = document.getElementById("agregarciudad1.1");
btnCancelarCiudadAgregar.addEventListener("click", CancelarFormCiudad);

const btnCancelarEditarCiudad = document.getElementById("editarciudad1.1");
btnCancelarEditarCiudad.addEventListener("click", CancelarFormEditarCiudad);


function showFormCiudadAgregar(idLista, nombrePadre, idParent) {
  zoneId = idParent
  var formAgregarCiudad = document.getElementById("form-ciudad-agregar")
  formAgregarCiudad.style.display = "block"
  document.getElementById("add-ciudad-region-name").placeholder = nombrePadre
  listaSeleccionada = document.getElementById(idLista)
}

function CancelarFormCiudad () {
  document.getElementById("form-ciudad-agregar").style.display = "none";
}

function CancelarFormEditarCiudad(){
  document.getElementById("form-ciudad-editar").style.display = "none";
}

async function formCrearCiudad () {
  var input = document.getElementById("valor-crear-ciudad");
  const ciudadCreate = await CrearCiudadesService(input.value, zoneId)

  if (!ciudadCreate || ciudadCreate.status !== 200) {
    alert("Ups, algo salio mal.")
    return 0
  }

  const ciudadData = await UnoCiudadesService(ciudadCreate.data)


  CancelarFormCiudad()
  ciudadDisplay(ciudadData, listaSeleccionada.id)

}

function ciudadDisplay (ciudad, idLista) {
  const ciudadEle = Ciudad(ciudad)
  lista = document.getElementById(idLista);
  lista.innerHTML = lista.innerHTML + ciudadEle
  updateCaret()
}

function Ciudad (ciudad) {
  const id = ciudad.id
  const ciudadEle = `
  <li id="${id}" class="ctrl-panel-child tree-leaf"> 
          <h4>${ciudad.name} </h4> 
          <button onclick="editarCiudad(${ciudad.id})" id="editar">Editar</button>
          <button onclick="eliminarCiudad(${ciudad.id})" id="borrar">Borrar</button>
      </li>
      `
  return ciudadEle
}

async function eliminarCiudad ( id) {

  const resultDelete = await BorrarCiudadesService(id)

  if ( !resultDelete || resultDelete.status !== 200 ){
    alert("Ups hubo un error")
    return 0
  }

  const ele = document.getElementById(id).parentElement;
  let lis = Array.from(ele.getElementsByTagName("li"))
  
  let index = -1;
  let i = 0


  for (let item of lis) {
    if (item.id === String(id)) 
      index = i;
    i++
  }

  ele.removeChild(lis[index])
}

function guardarCiudad () {

}

function editarCiudad (lista, id) {
  listaSeleccionada = document.getElementById(lista)
  formCiudadEditar.style.display = "block"
  
}

// MAIN

async function MostrarRegiones () {
  const regiones = await TodosRegionService()

  for (const region of regiones.regions) {
    const idLista = regionDisplay(region)
    for (const pais of region.countrys){
      const idListaPais = paisDisplay(pais, idLista)      
      for (const ciudad of pais.citys){
        ciudadDisplay(ciudad, idListaPais)
      }
    }
  }
}

MostrarRegiones()

