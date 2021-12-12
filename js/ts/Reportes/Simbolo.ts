import { Valor,Tipos } from "../tiposD/Tipos"

export class Simbolo{
    //public tipo:Tipo
    public tipo:Tipos
    public id:string
    public valor:any
    public entorno:string
    public categoria:string //( variable, arreglo)
    constructor(tipo:Tipos, id:string,valor:any,entorno:string,categoria:string){
        this.tipo=tipo
        this.id=id
        this.valor=valor
        this.entorno=entorno
        this.categoria=categoria
    }
}