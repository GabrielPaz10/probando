import { TablaSimbolo } from '../Reportes/TablaSimbolos';
import { TablaMetodos } from '../Reportes/TablaMetodos';
import { Nodo, Valor } from '../tiposD/Tipos';


export abstract class Expresion{
    public linea:number
    public columna: number

    /*
    aun faltan cambios, de importacion de cosas del ast y la consola 
     */
    constructor(linea:number,columna:number){
        this.columna=columna
        this.linea=linea
    }
    public abstract ejecutar(tsGlobal:TablaSimbolo, tsLocal:TablaSimbolo, metodos:TablaMetodos,entorno:string):Valor
    public abstract ast(metodos:TablaMetodos):Nodo
    //public abstract traducir()
}