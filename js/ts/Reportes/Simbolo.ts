import { Valor, Tipos, Intervalo } from '../tiposD/Tipos';

export class Simbolo{
    //public tipo:Tipo
    public tipo:Tipos|Intervalo
    public id:string
    public valor:any
    public entorno:string
    public categoria:string //( variable, arreglo)
    constructor(tipo:Tipos|Intervalo, id:string,valor:any,entorno:string,categoria:string='variable'){
        this.tipo=tipo
        this.id=id
        this.valor=valor
        this.entorno=entorno
        this.categoria=categoria
    }
}