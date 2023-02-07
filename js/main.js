const nueva_tarea = document.getElementById("nu-tarea")
const lista_incompletas = document.getElementById("lista-incompletas")
const lista_completas = document.getElementById("lista-completas")
const btn_agregar = document.getElementById("btn-nueva-tarea")

// Accede al item correspondiente al boton cliqueado, identifica en que lista se encuentra y lo pasa a la otra lista
function terminarTarea() {
    let item = this.parentNode.parentNode
    let lista = item.parentNode
    let lista_id = lista.id

    if(lista_id === lista_incompletas.id) {
        this.classList.replace("btn-success", "btn-info")
        let icon = this.firstChild
        icon.classList.replace("bi-check2-circle", "bi-arrow-repeat")

        lista.removeChild(item)
        lista_completas.insertBefore(item, lista_completas.childNodes[0])
    } else if(lista_id === lista_completas.id) {
        this.classList.replace("btn-info", "btn-success")
        let icon = this.firstChild
        icon.classList.replace("bi-arrow-repeat", "bi-check2-circle")

        lista.removeChild(item)
        lista_incompletas.insertBefore(item, lista_incompletas.childNodes[0])
    }
}

// Funcion que crea un item con todos sus elementos hijos y lo agrega a la lista de tareas incompletas
function crearItemNuevaTarea(texto) {
    let nuevo_item = document.createElement("li")
    nuevo_item.classList.add("my-1", "list-group-item", "d-flex", "align-items-center", "justify-content-between")

    
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
    
    let icono_completar = document.createElement("i")
    icono_completar.classList.add("bi", "bi-check2-circle")
    
    boton_completar.appendChild(icono_completar)
    
    // Grupo de botones
    grupo_botones.appendChild(boton_eliminar)
    grupo_botones.appendChild(boton_completar)
    
    // Item
    nuevo_item.appendChild(span)
    nuevo_item.appendChild(grupo_botones)

    // Agrega a la lista
    lista_incompletas.insertBefore(nuevo_item, lista_incompletas.childNodes[0])

    // LISTENERS
    // Terminar Tarea
    boton_completar.addEventListener("click", terminarTarea)
}

function nuevaTarea() {
    let tarea = nueva_tarea.value
    if(tarea) {
        crearItemNuevaTarea(tarea)
        nueva_tarea.value = ""
    }
}

btn_agregar.addEventListener("click", nuevaTarea)

nueva_tarea.addEventListener("keydown", event => {
    if(event.key === "Enter") nuevaTarea()
})