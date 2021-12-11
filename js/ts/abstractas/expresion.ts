

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
    public abstract ejecutar()
    //public abstract ast()
    //public abstract traducir()
}