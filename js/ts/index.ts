import { Consola } from './Reportes/Consola';
import { TablaError } from './Reportes/TablaError';
// const ejecutaar = document.getElementById('ejecutar')



// ejecutaar.addEventListener('click',()=>{
//     const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
//     alert(entrada)
//     alert(typeof(entrada))
    
    
// })

export let consola:Consola = new Consola()
export let errores:TablaError = new TablaError()
