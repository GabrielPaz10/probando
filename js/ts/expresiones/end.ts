import { Expresion } from '../abstractas/expresion';
import { TablaMetodos } from '../Reportes/TablaMetodos';
import { TablaSimbolo } from '../Reportes/TablaSimbolos';
import { Valor, Nodo, Intervalo } from '../tiposD/Tipos';
export class End extends Expresion{
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        return {tipo:Intervalo.END,valor:Intervalo.END}
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }

}