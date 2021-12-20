import { Expresion } from '../../abstractas/expresion';
import { Instruccion } from "../../abstractas/instruccion";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Nodo, TiposControl } from '../../tiposD/Tipos';

export class Return extends Instruccion{

    private valor:Expresion|null
    constructor(valor:Expresion|null,linea:number,columna:number){
        super(linea,columna)
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        if (this.valor===null) {
            return {tipo: TiposControl.RETURN, valor:null}
        }
        const val= this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        return {tipo: TiposControl.RETURN, valor:val}
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}