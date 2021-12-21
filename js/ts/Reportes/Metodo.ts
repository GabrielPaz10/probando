import { Tipos } from "../tiposD/Tipos";
import { Instruccion } from "../abstractas/instruccion";
export class Metodo{
    public tipo: Tipos
    public id:string
    public parametros:any[]|any
    public cuerpo:any[]
    constructor(tipo:Tipos,id:string,parametros:any[]|any,cuerpo:any[]){
        this.tipo=tipo
        this.id=id
        this.parametros=parametros
        this.cuerpo=cuerpo
    }
}