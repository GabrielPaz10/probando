import { Expresion } from '../../abstractas/expresion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
import { errores, consola } from '../../index';
import { Error } from '../../Reportes/Error';
export class Length extends Expresion{
    private valor:Expresion
    constructor(valor:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const valor = this.valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (valor.tipo!==Tipos.STRING) {//agregar lo de arreglos 
            errores.agregar(new Error('Semantico',`No se puede devolver LENGTH con un tipo ${valor.tipo}` ,this.linea,this.columna,entorno))
            consola.actualizar(`No se puede devolver LENGTH con un tipo ${valor.tipo}\n`)
        }
        return {tipo: Tipos.INT,valor: ((valor.valor).length)}
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}