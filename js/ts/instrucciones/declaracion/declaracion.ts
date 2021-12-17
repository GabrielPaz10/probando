import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos, Valor } from '../../tiposD/Tipos';
import { Expresion } from '../../abstractas/expresion';
import { consola, errores } from '../..';
import { Error } from '../../Reportes/Error';
import { Simbolo } from '../../Reportes/Simbolo';
export class Declaracion extends Instruccion{
    private tipo:Tipos
    private id:string[]
    private valor: Expresion|null
    constructor(tipo:Tipos,id:string[],valor:Expresion|null,fila:number,columna:number){
        super(fila,columna)
        this.tipo=tipo
        this.id=id
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        for(var i in this.id){
            this.declarar(this.id[i],tsGlobal,tsLocal,metodos,entorno)
        }
    }

    private declarar(id:string,tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string){
        const aux = tsLocal.obtenerSimbolo(id)
        if (aux) {
            errores.agregar(new Error('Semantico',`La variable ${id} ya esta definida`,this.linea,this.columna,entorno))
            consola.actualizar(`La variable ${id} ya esta definida l:${this.linea}, c:${this.columna}\n`)
        }
        var valor
        if (this.valor) {
            valor = this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        }else{
            valor= this.valorDefecto(this.tipo)
        }
        valor= this.verificarTipo(this.tipo,valor,this.linea,this.columna,entorno)
        tsLocal.agregar(new Simbolo(this.tipo,id,valor.Valor,entorno))
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
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
    public valorDefecto(tipo:Tipos):Valor{
        if (tipo===Tipos.INT) {
            return {tipo: Tipos.INT, valor:0}
        }else if(tipo===Tipos.DOUBLE){
            return {tipo: Tipos.DOUBLE,valor:0.0}
        }else if(tipo===Tipos.BOOLEAN){
            return {tipo:Tipos.BOOLEAN,valor:true}
        }else if(tipo===Tipos.CHAR){
            return {tipo:Tipos.CHAR,valor:'0'}
        }else if(tipo===Tipos.STRING){
            return {tipo:Tipos.STRING,valor:""}
        }
    }
    
}