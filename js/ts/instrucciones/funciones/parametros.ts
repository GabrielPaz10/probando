import { Nodo, Tipos } from '../../tiposD/Tipos';



export class Parametros{
    public tipo:Tipos
    public tipo2:Tipos|null
    public id:string
    constructor(tipo:Tipos,tipo2:Tipos|null,id:string){
        this.tipo=tipo
        this.tipo2=tipo2
        this.id=id
    }
    public ast():Nodo{
        //poner lo del ast
        return null
    }
}