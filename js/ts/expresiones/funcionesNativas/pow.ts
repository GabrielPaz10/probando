import { consola, errores } from "../..";
import { Expresion } from "../../abstractas/expresion";
import { Error } from "../../Reportes/Error";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Valor, Nodo, Tipos } from "../../tiposD/Tipos";

export class Pow extends Expresion{
    private base:Expresion
    private exponente:Expresion
    constructor(base:Expresion,exponente:Expresion, linea:number,columna:number){
        super(linea,columna)
        this.base=base
        this.exponente=exponente
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const base = this.base.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        const exponente = this.exponente.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if ((base.tipo===Tipos.INT&&exponente.tipo===Tipos.INT)) {
            return {tipo:Tipos.INT, valor:(Math.pow(base.valor,exponente.valor))}
        }else if ((base.tipo===Tipos.DOUBLE&&exponente.tipo===Tipos.INT)||
        (base.tipo===Tipos.INT&&exponente.tipo===Tipos.DOUBLE)
        ||(base.tipo===Tipos.DOUBLE&&exponente.tipo===Tipos.DOUBLE)){
            return {tipo:Tipos.DOUBLE, valor:(Math.pow(base.valor,exponente.valor))}
        }
        errores.agregar(new Error('Semantico',`No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo}` ,this.linea,this.columna,entorno))
        consola.actualizar(`No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo} \n`)
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby
        return null
    }
    
}