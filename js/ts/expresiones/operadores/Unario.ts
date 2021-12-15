import { Expresion } from "../../abstractas/expresion";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
import { errores, consola } from '../../index';
import { ObtenerValor } from "../valores/obtenerValor";
import { Error } from "../../Reportes/Error";

export enum TUnario{
    NEGATIVO,
    INCREMENTO,
    DECREMENTO
}
export class Unario extends Expresion{

    private tipoUni:TUnario
    private valor:Expresion
    constructor(tipoUni:TUnario,valor:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.tipoUni=tipoUni
        this.valor=valor
    }

    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        if (this.tipoUni!==TUnario.NEGATIVO&&!(this.valor instanceof ObtenerValor)) {
            errores.agregar(new Error('Semantico',`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`,this.linea,this.columna,entorno))
            consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`)
        }
        const valor = this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (valor.tipo==Tipos.INT ||valor.tipo==Tipos.DOUBLE) {
            switch (this.tipoUni) {
                case TUnario.NEGATIVO:
                    return {tipo:valor.tipo,valor:(-valor.valor)}
                case TUnario.DECREMENTO:
                    return {tipo:valor.tipo,valor:(valor.valor-1)}
                case TUnario.INCREMENTO:
                    return {tipo:valor.tipo,valor:(-valor.valor+1)}
            }
        }
        errores.agregar(new Error('Semantico',`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`,this.linea,this.columna,entorno))
            consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby 
        return null
    }

}