

export class Error{
    public tipo:string
    public descripcion:string
    public linea: number
    public columna:number
    public entorno:string
    constructor(tipo:string,descripcion:string,linea:number,columna:number,entorno:string){
        this.tipo=tipo
        this.descripcion=descripcion
        this.linea=linea
        this.columna=columna
        this.entorno=entorno
    }
}