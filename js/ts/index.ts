import { Consola } from './Reportes/Consola';
import { TablaError } from './Reportes/TablaError';
import { Metodo } from './Reportes/Metodo';
import { TablaMetodos } from './Reportes/TablaMetodos';
// const ejecutaar = document.getElementById('ejecutar')



// ejecutaar.addEventListener('click',()=>{
//     const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
//     alert(entrada)
//     alert(typeof(entrada))
    
    
// })

export let consola:Consola = new Consola()
export let errores:TablaError = new TablaError()
export function obtenerMain(metodos:TablaMetodos):Metodo[]{
    return metodos.metodoss.filter((main:Metodo) => main.id==='main')
}
