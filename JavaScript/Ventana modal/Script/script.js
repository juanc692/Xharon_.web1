const abrir = document.getElementById("abrirModal");
const cerrar = document.getElementById("cerrarModal");
const cuadro = document.querySelector(".overlay");

function mostrarTerminos()
{
    cuadro.classList.add("visible");
}

function cerrarTerminos(e)
{
    if(e.target === cuadro || e.target === cerrar)
    {
        cuadro.classList.remove("visible");
    }
    
}

abrir.addEventListener("click", mostrarTerminos);
cerrar.addEventListener("click", cerrarTerminos);
cuadro.addEventListener("click", cerrarTerminos);
// no le envio nada manualmente (e), lo hace el navegador solo al ser un
// add event listener