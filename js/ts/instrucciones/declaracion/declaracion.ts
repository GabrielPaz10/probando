import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos } from '../../tiposD/Tipos';
import { Expresion } from '../../abstractas/expresion';
export class Declaracion extends Instruccion{
    private tipo:Tipos
    private id:string[]
    private valor: Expresion|null
    constructor(tipo:Tipos,id:string[],valor:Expresion|null,fila:number,columna:number){
        super(fila,columna)
        this.tipo=tipo
        this.id=id
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        throw new Error('Method not implemented.');
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}