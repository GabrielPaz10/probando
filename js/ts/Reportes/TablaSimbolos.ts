//import tipo
import { Simbolo } from './Simbolo';

export class TablaSimbolo{
    private simbolos:Simbolo[]
    constructor(simbolos:Simbolo[]){
        this.simbolos=[]
        this.simbolos=this.simbolos.concat(simbolos)
    }

    public agregar(simbolo:Simbolo){
        this.simbolos.push(simbolo)
    }
    public obtenerSimbolo(id:string):Simbolo|any{
        var simbolo = this.simbolos.filter((simb:Simbolo)=>simb.id==id)[0]
        if(simbolo)
            return simbolo
        return null
    }
    getSimbolos(){
        return this.simbolos
    }
    public actualizar(id:string,valor:any){
        var simbolo = this.simbolos.filter((simb:Simbolo) =>simb.id==id)[0]
        if (simbolo) {
            simbolo.valor=valor
        }
        //ver si se pone mensaje de error
    }
}
