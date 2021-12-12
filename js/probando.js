const ejecutar = document.getElementById('ejecutar')
const consola = document.getElementById('consola')
let contenido =""


ejecutar.addEventListener('click',()=>{
    const entrada=document.getElementById("entrada").value
    alert(entrada)
    alert(typeof(entrada))
    analizador.parse(entrada)
    consola.value=contenido
})

