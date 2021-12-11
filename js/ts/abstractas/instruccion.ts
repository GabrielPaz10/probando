


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

    public abstract ejecutar()
    //public abstract ast()
    //public abstract traducir()
}