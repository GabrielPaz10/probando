import { Consola } from './Reportes/Consola';
import { TablaError } from './Reportes/TablaError';
import { Metodo } from './Reportes/Metodo';
import { TablaMetodos } from './Reportes/TablaMetodos';
import { TablaSimbolo } from './Reportes/TablaSimbolos';
import { Instruccion } from './abstractas/instruccion';
import { Error } from './Reportes/Error';
import { TiposControl } from './tiposD/Tipos';
// const ejecutaar = document.getElementById('ejecutar')



// ejecutaar.addEventListener('click',()=>{
//     const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
//     alert(entrada)
//     alert(typeof(entrada))
    
    
// })
export const consola = new Consola()
export const errores = new TablaError()
export const simbolos = new TablaSimbolo([])
const analizador = require('../analizador/analizador.js')
let main :any[]=[]
let metodos:TablaMetodos
let ast:any

function limpiarTodo(){
    consola.limpiar()
    errores.vaciar()
    simbolos.limpiar()
}
export function ejecutar(entrada:string):string{
    limpiarTodo()
    const tsGlobal = new TablaSimbolo([])
    const tsLocal = new TablaSimbolo([])
    metodos = new TablaMetodos([])
    main=[]
    try {
        ast = analizador.parse(entrada)
        obtenerAst(ast,tsGlobal,metodos)
        main= obtenerMain(metodos)
        ejecutarMain(main,tsGlobal,tsLocal,metodos)
    } catch (error) {
        console.log(error)
    }
    return consola.publicar()
}
function obtenerAst(ast:any, tsGlobal:TablaSimbolo,metodos:TablaMetodos){
    for(const instruction of ast){
        try {
            if(instruction instanceof Instruccion)
                instruction.ejecutar(tsGlobal, tsGlobal, metodos, "-")
        } catch (error) {
            if(error instanceof Error) errores.agregar(error)
        }
    }
}
function ejecutarMain(main:any, tsGlobal:TablaSimbolo, tsLocal:TablaSimbolo,metodos:TablaMetodos){
    if (main.length===1) {
        
        const control = cuerpoMain(main[0].cuerpo,tsGlobal,tsLocal,metodos,'')
        if (control !=null&&control !=undefined) {
            if (control.tipo==TiposControl.RETURN) {
                if (control.valor==null) return
            }
        }
    }else if(main.length>1){
        consola.actualizar(`Solo puede haber un metodo Main en el programa`)
        errores.agregar(new Error('Semantico',`Solo puede haber un metodo Main en el programa`,0,0,'Global'))
    }else if(main.length<1){
        consola.actualizar(`Debe haber un metodo Main en el programa`)
        errores.agregar(new Error('Semantico',`Debe haber un metodo Main en el programa`,0,0,'Global'))
    }
}
function cuerpoMain(cuerpo:Instruccion[],tsGlobal:TablaSimbolo, tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string){
    for(var i in cuerpo){
        const control = cuerpo[i].ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (control !==null && control!==undefined) {
            return control
        }
    }
    return null
}
export function obtenerMain(metodos:TablaMetodos):Metodo[]{
    return metodos.metodoss.filter((main:Metodo) => main.id==='main')
}
