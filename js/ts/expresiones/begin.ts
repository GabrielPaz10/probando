import { Expresion } from '../abstractas/expresion';
import { TablaMetodos } from '../Reportes/TablaMetodos';
import { TablaSimbolo } from '../Reportes/TablaSimbolos';
import { Valor, Nodo, Intervalo } from '../tiposD/Tipos';
export class Begin extends Expresion{
    constructor(linea:number,columna:number){
        super(linea,columna)
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        return {tipo:Intervalo.BEGIN,valor:Intervalo.BEGIN}
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}