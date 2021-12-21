import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos, Valor } from '../../tiposD/Tipos';
import { Expresion } from '../../abstractas/expresion';
import { errores, consola, simbolos } from '../../index';
import { Error } from '../../Reportes/Error';
import { Simbolo } from '../../Reportes/Simbolo';
export class AsignacionArreglo extends Instruccion{
    private id:string
    private indice:Expresion
    private valor:Expresion
    constructor(id:string,indice:Expresion,valor:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.indice=indice
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        const indice = this.indice.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (indice.tipo!==Tipos.INT&& indice.tipo!== Tipos.DOUBLE) {
            consola.actualizar(`El indice debe ser INT, no ${indice.tipo}, linea:${this.linea}, columna:${this.columna}`)
            errores.agregar(new Error('Semantico',`El indice debe ser INT, no ${indice.tipo}`,this.linea,this.columna,entorno))
        }
        const valor = this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        let simbolo = tsLocal.obtenerSimbolo(this.id)
        if (simbolo) {
            this.revActualizar(tsLocal,simbolo,valor,indice.valor,entorno)
        }else{
            simbolo = tsGlobal.obtenerSimbolo(this.id)
            if (simbolo) {
                this.revActualizar(tsGlobal,simbolo,valor,indice.valor,entorno)
            }else{
                consola.actualizar(`No se pudo encontrar el simbolo ${this.id}, linea:${this.linea} ,columna: ${this.columna}`)
                errores.agregar(new Error('Semantico',`No se pudo encontrar el simbolo ${this.id}`,this.linea,this.columna,entorno))
            }
        }
    }


    private revActualizar(ts:TablaSimbolo,simbolo:Simbolo,valor:Valor,indice:number,entorno:string){
        let vector = simbolo.valor
        if (simbolo.tipo!==Tipos.ARRAY) {
            consola.actualizar(`No es un arreglo, no se puede acceder a la posicion, linea: ${this.linea}, columna:${this.columna}`)
            errores.agregar(new Error('Semantico',`No es un arreglo, no se puede acceder a la posicion`,this.linea,this.columna,entorno))
            return;
        }
        this.verificarIndice(indice,vector,this.id,this.linea,this.columna,entorno)
        const aux = this.verificarTipo(vector[0].tipo,valor,this.linea,this.columna,entorno)
        vector[indice]=aux
        ts.actualizar(this.id,vector)
        simbolos.actualizar(this.id,vector)
    }


    public verificarIndice(indice:number,vector:any,id:string,linea:number,columna:number,entorno:string){
        if (indice<0|| indice>vector.length) {
            consola.actualizar(`Indice fuera de rango, linea: ${this.linea}, columna: ${this.columna}`)
            errores.agregar(new Error('Semantico',``,this.linea,this.columna,entorno))
        }
    }


    public verificarTipo(tipo:Tipos,valor:Valor,linea:number,columna:number,entorno:string){
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