import { consola, errores } from "../..";
import { Expresion } from "../../abstractas/expresion";
import { Error } from "../../Reportes/Error";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';

export class Tan extends Expresion{
    private angulo:Expresion
    constructor(angulo:Expresion, linea:number,columna:number){
        super(linea,columna)
        this.angulo=angulo
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const angulo = this.angulo.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (angulo.tipo===Tipos.INT || angulo.tipo===Tipos.DOUBLE) {
            return {tipo:Tipos.DOUBLE,valor:(Math.tan(angulo.valor)*(180/(Math.PI)))}
        }
        
        errores.agregar(new Error('Semantico',`No se puede calcular la tangente con el tipo ${angulo.tipo}` ,this.linea,this.columna,entorno))
        consola.actualizar(`No se puede calcular la tangente con el tipo ${angulo.tipo}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}