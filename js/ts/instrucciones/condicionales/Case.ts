import { Instruccion } from '../../abstractas/instruccion';
import { Expresion } from '../../abstractas/expresion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { Nodo } from '../../tiposD/Tipos';
export class Case{
    public valor:Expresion
    public cuerpo:Instruccion[]
    constructor(valor:Expresion,cuerpo:Instruccion[]){
        this.valor=valor
        this.cuerpo=cuerpo
    }
    public ast(metodos:TablaMetodos):Nodo{//hola Aby xd
        return null
    }
    private obtenerCuerpo(metodos:TablaMetodos):Nodo{//hola x2
        return null
    }
}