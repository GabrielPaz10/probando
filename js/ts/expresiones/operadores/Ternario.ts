import { consola, errores } from '../..';
import { Expresion } from '../../abstractas/expresion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class Ternario extends Expresion{
    private condicion: Expresion
    private verdadero: Expresion
    private falso: Expresion
    constructor(condicion:Expresion,verdadero:Expresion,falso:Expresion,linea:number,columna:number){
        super(linea, columna)
        this.condicion=condicion
        this.verdadero=verdadero
        this.falso=falso
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const condicion = this.condicion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (condicion.tipo!= Tipos.BOOLEAN) {
            errores.agregar(new Error('Semantico',`La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}`,this.linea,this.columna,entorno))
            consola.actualizar(`La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}\n`)
        }
        if (condicion.valor) {
            return this.verdadero.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        } else {
            return this.falso.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        }
    }
    public ast(metodos: TablaMetodos): Nodo { //hola aby
        return null
    }
    
}