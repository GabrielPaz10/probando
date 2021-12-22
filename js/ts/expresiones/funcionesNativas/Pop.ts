import { Expresion } from '../../abstractas/expresion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
import { errores, consola } from '../../index';
import { Error } from '../../Reportes/Error';
export class Pop extends Expresion{
    private valor:string
    constructor(valor:string,linea:number,columna:number){
        super(linea,columna)
        this.valor=valor
    }
    
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        var valor = tsLocal.obtenerSimbolo(this.valor)
        if (!valor) {
            valor = tsGlobal.obtenerSimbolo(this.valor)
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
        var sacar = valor.valor.pop()
        return {tipo: sacar.tipo,valor:sacar.valor}
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null;
    }
    
}