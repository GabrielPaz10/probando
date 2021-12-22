import { consola, errores } from '../index';
import { Expresion } from '../abstractas/expresion';
import { Error } from '../Reportes/Error';
import { TablaMetodos } from '../Reportes/TablaMetodos';
import { TablaSimbolo } from '../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos, TiposControl } from '../tiposD/Tipos';
import { Instruccion } from '../abstractas/instruccion';
import { Metodo } from '../Reportes/Metodo';
import { Simbolo } from '../Reportes/Simbolo';
export class LlamarFuncion extends Expresion{
    private id:string
    private parametros:Expresion[]
    constructor(id:string,parametros:Expresion[],linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.parametros=parametros
    }
    
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const metodo = metodos.get(this.id)
        if (metodo!==null) {
            if (metodo.tipo!==Tipos.VOID) {
                if (metodo.parametros.length===this.parametros.length) {
                    var local2 = this.obtenerEntorno(metodo,tsGlobal,tsLocal,metodos,entorno)
                    const control = this.ejecutarMetodo(metodo.cuerpo,tsGlobal,local2,metodos,entorno+this.id)
                    //retornos
                    if (control!==null&&control!==undefined) {
                        if (control.tipo==TiposControl.RETURN) {
                            if (control.valor!==null) {
                                if (control.valor.tipo===metodo.tipo) {
                                    return control.valor
                                }
                            }
                            this.ponerError(`No se pude retornar tipo ${control.valor.tipo}`,this.linea,this.columna,entorno+this.id)
                        }
                    }
                }else if(metodo.parametros.length>=this.parametros.length){
                    this.ponerError(`Menos atributos de los esperados`,this.linea,this.columna,entorno)
                }else{
                    this.ponerError(`Mas atributos de los esperados`,this.linea,this.columna,entorno)
                }
            } else if (metodo.tipo===Tipos.VOID) {
                if (metodo.parametros.length===this.parametros.length) {
                    var tsLocal2 = this.obtenerEntorno(metodo,tsGlobal,tsLocal,metodos,entorno)
                    const control = this.ejecutarMetodo(metodo.cuerpo,tsGlobal,tsLocal2,metodos, entorno+this.id)
                    //para los retornos
                    if (control!==null&&control!==undefined) {
                        if (control===TiposControl.RETURN) {
                            if (control.valor===null) {
                                return
                            }
                            this.ponerError(`No se puede retornar tipo: ${control.valor.tipo} en metodo VOID`,this.linea,this.columna,entorno+this.id)
                        }
                    }
                    return
                }else if(metodo.parametros.length>=this.parametros.length){
                    this.ponerError(`Hay menos parametros de los esperados`,this.linea,this.columna,entorno)
                }else{
                    this.ponerError(`Hay mas parametros de los esperados`,this.linea,this.columna,entorno)
                }
            }
            this.ponerError(`Funcion no asignada de forma correcta`,this.linea,this.columna,entorno)
        }
        this.ponerError(`El metodo ${this.id} no se pudo encontrar`,this.linea,this.columna,entorno)
    }
    private obtenerEntorno(metodo:Metodo,tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string):TablaSimbolo{
        var stLocal2= new TablaSimbolo([])
        for(var i in this.parametros){
            var valor = this.parametros[i].ejecutar(tsGlobal,tsLocal,metodos,entorno)
            if(valor.tipo===metodo.parametros[i].tipo){
                stLocal2.agregar(new Simbolo(valor.tipo,metodo.parametros[i].id,valor.valor,entorno))
            }else{
                this.ponerError(`El tipo ${valor.tipo} no coincide con el parametro`,this.linea,this.columna,entorno)
            }
        }
        return stLocal2
    }
    private ejecutarMetodo(cuerpo:Instruccion[],tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo, metodos:TablaMetodos,entorno:string){
        for(var i in cuerpo){
            const control= cuerpo[i].ejecutar(tsGlobal,tsLocal,metodos,entorno)
            if (control!==null && control!==undefined) {
                if (control.tipo===TiposControl.BREAK ||control.tipo===TiposControl.CONTINUE||control.tipo===TiposControl.RETURN) {
                    return control
                }
            }
        }
        return null
    }
    private ponerError(mensaje:string,linea:number,columna:number, entorno:string){
        errores.agregar(new Error('Semantico',mensaje,linea,columna,entorno))
        consola.actualizar(mensaje+` l: ${linea}, c: ${columna}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}