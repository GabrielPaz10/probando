import { Instruccion } from "../../abstractas/instruccion";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Nodo, TiposControl } from '../../tiposD/Tipos';

export class Break extends Instruccion{
    constructor(linea:number,columna:number){
        super(linea,columna)
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        return {tipo:TiposControl.BREAK,linea:this.linea,columna:this.columna}
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby 
        return null
    }
    
}