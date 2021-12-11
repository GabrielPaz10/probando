import { Error } from "./Error";
export class TablaError{
    private errores:Error[]
    constructor(){
        this.errores=[]
    }
    vaciar(){
        this.errores=[]
    }
    agregar(error:Error){
        this.errores.push(error)
    }
    get(){
        return this.errores
    }
}