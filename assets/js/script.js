//VARIABLES

let lista = document.getElementById("lista");
let btnagregar = document.getElementById("btnagregar");
let inputdatos = document.getElementById("inputdatos");
let total = document.getElementById("total");
let realizadas = document.getElementById("realizadas");
let tareasTotal = 0;
let tareasListas = 0;



let listaTareas = [
  { name: "comprar mercaderia", checked: false },
  { name: "preparar desafio", checked: false },
  { name: "lavar ropa", checked: false },
];

//FUNCIONES
function actualizarIds() {
  listaTareas = listaTareas.map((tarea, index) => {
    return { ...tarea, id: index + 1, };
  });
}
function contadorTareas() {
  tareasTotal = listaTareas.length;
  total.innerText = tareasTotal;

  let cuantosChecked = listaTareas.filter((tareas) => tareas.checked == true);
  realizadas.innerText = cuantosChecked.length;
}

/* ------------------------------ */
function cambiarEstado(id) {
  let estado = listaTareas.find((estado) => estado.id == id);
  estado.checked = !estado.checked;
  renderizarLista();
}

//Funcion para Actualizar Lista----------
function renderizarLista() {
  actualizarIds();
  let template = ``;
  for (let task of listaTareas) {
    template += `<li>
          <div class="datos">
            <p id="${task.id}" class="${task.checked ? "tachado" : ""}">
              ${task.id}
            </p>
            <p id="${task.id}" class="${task.checked ? "tachado" : ""}">
              ${task.name}
            </p>
          </div>
          <div class="triggers">
            <input type="checkbox" onchange="cambiarEstado(${task.id})" ${
      task.checked ? "checked" : ""
    }>
            <button class="eliminar" onclick="borrarPorId(${task.id})">X</button>
          </div>
        </li>`;
  }
  lista.innerHTML = template;
  contadorTareas();
}

/* --------------------------------------------------------------------------------------------- */
/* Crear una Tarea */
function crearTarea(task) {
  let tarea = {
    name: `${task}`,
    checked: false,
  };
  listaTareas.push(tarea);
  renderizarLista();
}

/* Borrar una Tarea */
function borrarPorId(id) {
  let indiceTask = listaTareas.findIndex((tarea) => tarea.id == id);
  listaTareas.splice(indiceTask, 1);
  renderizarLista();
}

//Ingresa input a la lista con el boton  click en agregar
btnagregar.addEventListener("click", () => {
  let tarea = inputdatos.value;
  if (tarea.trim() != "") {
    crearTarea(tarea.trim());
    inputdatos.value = "";
  }
});
renderizarLista();