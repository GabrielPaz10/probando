import { TablaMetodos } from '../Reportes/TablaMetodos';
import { TablaSimbolo } from '../Reportes/TablaSimbolos';
import { Nodo } from '../tiposD/Tipos';



export abstract class Instruccion{
    public linea:number
    public columna:number

    /*
    aun faltan cambios, de importacion de cosas del ast y la consola 
     */
    constructor(linea:number,columna:number){
        this.linea=linea
        this.columna=columna
    }

    public abstract ejecutar(tsGlobal:TablaSimbolo, tsLocal:TablaSimbolo, metodos:TablaMetodos,entorno:string):any
    public abstract ast(metodos:TablaMetodos):Nodo
    //public abstract traducir()
}