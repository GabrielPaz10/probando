import { Funcion } from "./funcion";

export class Main{
    private metodo:Funcion
    constructor(metodo:Funcion){
        this.metodo=metodo
    }
    public ejectuar(metodos:any[]){
        metodos.push(this.metodo)
    }
}