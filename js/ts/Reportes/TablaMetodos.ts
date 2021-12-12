import { Instruccion } from "../abstractas/instruccion";
import { Parametros } from "../instrucciones/funciones/parametros";
import { Tipos } from "../tiposD/Tipos";
import { Metodo } from "./Metodo";
export class TablaMetodos{
    private metodos:Metodo[]
    
    constructor(metodos:Metodo[]){
        this.metodos=[]
        this.metodos=this.metodos.concat(metodos)
    }

    public agregar(tipo:Tipos,id:string,parametros:Parametros[],cuerpo:Instruccion[]){
        this.metodos.push(new Metodo(tipo,id,parametros,cuerpo))
    }
    public get(id:string){
        var metodo= this.metodos.filter((metod:Metodo)=>metod.id==id)[0]
        if (metodo) {
            return metodo
        }
        return null
    }

    public limpiarC(id:string){ 
        var metodo= this.metodos.filter((metod:Metodo)=>metod.id==id)[0]
        if (metodo) {
            metodo.cuerpo=[]
        } 
    }
    get metodoss(){
        return this.metodos
    }
}