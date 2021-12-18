import { Expresion } from '../../abstractas/expresion';
import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Valor, Tipos, Intervalo } from '../../tiposD/Tipos';
import { Simbolo } from '../../Reportes/Simbolo';
import { consola, errores } from '../..';
import { Error } from '../../Reportes/Error';
export class Asignacion extends Instruccion{
    private id:string
    private valor:Expresion
    constructor(id:string,valor:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        const valor = this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        var simbolo = tsLocal.obtenerSimbolo(this.id)
        if (simbolo) {
            this.actualizarValor(tsLocal,simbolo,valor,entorno)
        }else{
            simbolo= tsGlobal.obtenerSimbolo(this.id)
            if (simbolo) {
                this.actualizarValor(tsGlobal,simbolo,valor,entorno)
            }else{
                errores.agregar(new Error('Semantico',`Variable ${this.id} no declarada`,this.linea,this.columna,entorno))
                consola.actualizar(`Variable ${this.id} no declarada l:${this.linea}, c:${this.columna}\n`)
            }
        }
    }
    private actualizarValor(ts:TablaSimbolo,simbolo:Simbolo, valor:Valor,entorno){
        const aux = this.verificarTipo(simbolo.tipo,valor,this.linea,this.columna,entorno)
        ts.actualizar(this.id,aux.valor)
    }
    public verificarTipo(tipo:Tipos|Intervalo,valor:Valor,linea:number,columna:number,entorno:string){
        if (tipo===valor.tipo) {
            return valor
        }else if(tipo===Tipos.DOUBLE){
            if (valor.tipo===Tipos.INT) {
                return {tipo:tipo,valor: valor.valor}
            }
        }else if(tipo===Tipos.INT){
            if (valor.tipo===Tipos.BOOLEAN) {
                if (valor.valor===true) {
                    return {tipo:tipo,valor:1}
                }else if(valor.valor===false){
                    return {tipo:tipo,valor:0}
                }
            }else if(valor.tipo===Tipos.CHAR){
                return {tipo:tipo,valor:valor.valor.charCodeAt(0)}
            }else if(valor.tipo===Tipos.DOUBLE){
                return {tipo:tipo, valor:(valor.valor<0)?Math.ceil(valor.valor):Math.floor(valor.valor)}
            }
        }
        errores.agregar(new Error('Semantico',`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo}`,this.linea,this.columna,entorno))
        consola.actualizar(`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo} l:${this.linea}, c:${this.columna}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}