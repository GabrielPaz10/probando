import { Expresion } from "../../abstractas/expresion";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Valor, Nodo } from "../../tiposD/Tipos";

export enum TUnario{
    NOT,
    INCREMENTO,
    DECREMENTO
}
export class Unario extends Expresion{

    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        throw new Error("Method not implemented.");
    }
    public ast(metodos: TablaMetodos): Nodo {
        throw new Error("Method not implemented.");
    }

}