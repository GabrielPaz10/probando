import { consola, errores } from '../..';
import { Expresion } from '../../abstractas/expresion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class Sqrt extends Expresion{
    private raiz:Expresion
    constructor(raiz:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.raiz=raiz
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const raiz= this.raiz.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (raiz.tipo===Tipos.INT || raiz.tipo===Tipos.DOUBLE) {
            return {tipo:Tipos.DOUBLE,valor:(Math.sqrt(raiz.valor))}
        }
        
        errores.agregar(new Error('Semantico',`No se puede calcular la raiz con el tipo ${raiz.tipo}` ,this.linea,this.columna,entorno))
        consola.actualizar(`No se puede calcular la raiz con el tipo ${raiz.tipo}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby
        return null
    }
    
}