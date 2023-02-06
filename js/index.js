const nueva_tarea = document.getElementById("nu-tarea")
const lista_incompletas = document.getElementById("lista-incompletas")
const lista_completas = document.getElementById("lista-completas")
const agregar = document.getElementById("btn-nueva-tarea")

// Funcion que crea un item con todos sus elementos hijos y lo agrega a la lista de tareas incompletas
function crearItemNuevaTarea(texto) {
    let nuevo_item = document.createElement("li")
    nuevo_item.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between")

    
    let span = document.createElement("span")
    span.innerHTML = texto
    
    let grupo_botones = document.createElement("div")
    grupo_botones.classList.add("btn-group")
    
    let boton_eliminar = document.createElement("button")
    boton_eliminar.classList.add("btn", "btn-danger")
    boton_eliminar.setAttribute("data-bs-toggle", "modal")
    boton_eliminar.setAttribute("data-bs-target", "#eliminarM")
    
    let icono_eliminar = document.createElement("i")
    icono_eliminar.classList.add("bi", "bi-x-circle")
    
    boton_eliminar.appendChild(icono_eliminar)

    let boton_completar = document.createElement("button")
    boton_completar.classList.add("btn", "btn-success")
    boton_completar.setAttribute("id", "completar-btn")
    
    let icono_completar = document.createElement("i")
    icono_completar.classList.add("bi", "bi-check2-circle")
    icono_completar.setAttribute("id", "icon-com")
    
    boton_completar.appendChild(icono_completar)
    
    // Grupo de botones
    grupo_botones.appendChild(boton_eliminar)
    grupo_botones.appendChild(boton_completar)
    
    // Item
    nuevo_item.appendChild(span)
    nuevo_item.appendChild(grupo_botones)

    // Agrega a la lista
    lista_incompletas.appendChild(nuevo_item)
}

function terminarTarea() {
    let boton = document.getElementById("completar-btn")
    boton.classList.replace("btn-success", "btn-info")
    boton.id = "agregar-again"
    let icon = boton.firstChild
    icon.classList.replace("bi-check2-circle", "bi-arrow-repeat")
    icon.id = "icon-aga"
    let item = boton.parentNode.parentNode
    lista_incompletas.removeChild(item)
    lista_completas.appendChild(item)

    // <i class="bi bi-arrow-repeat"></i>
}

function agregarAgain() {
    let boton = document.getElementById("agregar-again")
    boton.classList.replace("btn-info", "btn-success")
    boton.id = "completar-btn"
    let icon = boton.firstChild
    icon.classList.replace("bi-arrow-repeat", "bi-check2-circle")
    icon.id = "icon-com"
    let item = boton.parentNode.parentNode
    lista_completas.removeChild(item)
    lista_incompletas.appendChild(item)
}

agregar.addEventListener("click", () => {
    let tarea = nueva_tarea.value
    if(tarea) {
        crearItemNuevaTarea(tarea)
        nueva_tarea.value = ""
    }
})

lista_incompletas.addEventListener("click", event => {
    let event_id = event.target.id
    if(event_id === "completar-btn" || event_id === "icon-com") {
        terminarTarea()
    }
})

lista_completas.addEventListener("click", event => {
    let event_id = event.target.id
    if(event_id === "agregar-again" || event_id === "icon-aga") {
        agregarAgain()
    }
})