import { consola, errores } from "../../index";
import { Expresion } from "../../abstractas/expresion";
import { Error } from "../../Reportes/Error";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Valor, Nodo, Tipos } from "../../tiposD/Tipos";

export class ToInt extends Expresion{
    private expresion:Expresion
    constructor(expresion:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.expresion=expresion
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const valor = this.expresion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (valor.tipo===Tipos.DOUBLE|| valor.tipo===Tipos.BOOLEAN) {
            return {tipo:Tipos.INT,valor:(valor.valor<0)?Math.ceil(valor.valor):Math.floor(valor.valor)}
        }
        errores.agregar(new Error('Semantico',`No se puede Truncar con un tipo ${valor.tipo}` ,this.linea,this.columna,entorno))
        consola.actualizar(`No se puede Truncar con un tipo ${valor.tipo}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}