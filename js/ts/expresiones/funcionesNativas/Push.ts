import { Expresion } from '../../abstractas/expresion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
import { errores, consola } from '../../index';
import { Error } from '../../Reportes/Error';
export class Push extends Expresion{
    private nombre:string
    private valor:Expresion
    constructor(nombre:string,valor:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.nombre=nombre
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        var valor = tsLocal.obtenerSimbolo(this.nombre)
        if (!valor) {
            valor = tsGlobal.obtenerSimbolo(this.nombre)
            if (!valor) {
                errores.agregar(new Error('Semantico',`arreglo no encontrado ${valor.id}` ,this.linea,this.columna,entorno))
                consola.actualizar(`arreglo no encontrado: ${valor.id}, linea: ${this.linea}, columna: ${this.columna}\n`)
                return
            }
        }
        if (valor.tipo!==Tipos.ARRAY) {
            errores.agregar(new Error('Semantico',`No se puede quitar un elemento de un tipo: ${valor.tipo}` ,this.linea,this.columna,entorno))
            consola.actualizar(`No se puede quitar un elemento de un tipo: ${valor.tipo}, linea: ${this.linea}, columna: ${this.columna}\n`)
        }
        var nuevo = this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)

        var sacar = valor.valor.push(nuevo)
        return {tipo: sacar.tipo,valor:valor.valor.length}
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}