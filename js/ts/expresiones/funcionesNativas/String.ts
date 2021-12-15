import { consola, errores } from '../..';
import { Expresion } from '../../abstractas/expresion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class String extends Expresion{
    private valor:Expresion
    constructor(valor:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const valor = this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (valor.tipo!==Tipos.NULL) {
            return {tipo:Tipos.STRING,valor:(valor.valor).toString()}
        }
        errores.agregar(new Error('Semantico',`El tipo ${valor.tipo} no puede convertirse a STRING` ,this.linea,this.columna,entorno))
        consola.actualizar(`El tipo ${valor.tipo} no puede convertirse a STRING\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}