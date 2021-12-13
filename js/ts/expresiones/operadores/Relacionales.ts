import { Expresion } from '../../abstractas/expresion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';

export enum TiposRelacional{
    MAYORI,
    MENORI,
    DIFERENTE,
    MAYOR,
    IGUAL,
    MENOR
}

export class Relacional extends Expresion{
    
    private relacion:TiposRelacional
    private izquierda:Expresion
    private derecho: Expresion
    constructor(relacion:TiposRelacional,izquierda:Expresion,derecho:Expresion, linea:number,columna:number){
        super(linea,columna)
        this.relacion=relacion
        this.izquierda=izquierda
        this.derecho=derecho
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const izq = this.izquierda.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        const dere = this.derecho.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        switch (this.relacion) {
            case TiposRelacional.IGUAL:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor==dere.valor)}
            case TiposRelacional.DIFERENTE:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor!=dere.valor)}
            case TiposRelacional.MAYOR:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor>dere.valor)}
            case TiposRelacional.MENOR:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor<dere.valor)}
            case TiposRelacional.MAYORI:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor>=dere.valor)}
            case TiposRelacional.MENORI:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor<=dere.valor)}
        }
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby
        return null
    }
}
