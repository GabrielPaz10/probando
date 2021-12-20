import { Expresion } from '../../abstractas/expresion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class Typeof extends Expresion{
    private expresion:Expresion
    constructor(expresion:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.expresion=expresion
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const expresion = this.expresion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        return {tipo: Tipos.STRING,valor: (expresion.tipo)}
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}