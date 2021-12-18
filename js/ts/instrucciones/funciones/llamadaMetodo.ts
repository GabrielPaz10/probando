import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos, TiposControl } from '../../tiposD/Tipos';
import { Expresion } from '../../abstractas/expresion';
import { consola, errores } from '../..';
import { Error } from '../../Reportes/Error';
import { Metodo } from '../../Reportes/Metodo';
import { Simbolo } from '../../Reportes/Simbolo';
export class LlamadaMetodo extends Instruccion{
    private id:string
    private parametros:Expresion[]
    constructor(id:string, parametros:Expresion[], linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.parametros=parametros
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        const metodo = metodos.get(this.id)
        if (metodo) {
            if (metodo.tipo===Tipos.VOID) {
                if (metodo.parametros.length===this.parametros.length) {
                    var tsLocal2 = this.obtenerEntorno(metodo,tsGlobal,tsLocal,metodos,entorno)
                    const control = this.ejecutarMetodo(metodo.cuerpo,tsGlobal,tsLocal2,metodos, entorno)
                    //para los retornos
                    if (control!==null&&control!==undefined) {
                        if (control===TiposControl.RETURN) {
                            if (control.valor===null) {
                                return
                            }
                            this.ponerError(`No se puede retornar tipo: ${control.valor.tipo} en metodo VOID`,this.linea,this.columna,entorno)
                        }
                    }
                    return
                }else if(metodo.parametros.length>=this.parametros.length){
                    this.ponerError(`Hay menos parametros de los esperados`,this.linea,this.columna,entorno)
                }else{
                    this.ponerError(`Hay mas parametros de los esperados`,this.linea,this.columna,entorno)
                }
            }
            this.ponerError(`El metodo VOID no asignado de forma correcta`,this.linea,this.columna,entorno)
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
                return control
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