const ejecutar = document.getElementById('ejecutar')
const consola = document.getElementById('consola')
let contenido =""
//let cm1 = new CodeMirror();

//let cm2 = new CodeMirror.fromTextArea(document.findElementById("entrada"));
var cm3 = new CodeMirror.fromTextArea(document.getElementById("entrada").value, {lineNumbers: true});

ejecutar.addEventListener('click',()=>{
    const entrada=document.getElementById("entrada").value
    alert(entrada)
    alert(typeof(entrada))
    analizador.parse(entrada)
    consola.value=contenido
})

