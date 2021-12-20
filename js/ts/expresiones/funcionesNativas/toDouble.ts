import { consola, errores } from '../../index';
import { Expresion } from '../../abstractas/expresion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class ToDouble extends Expresion{
    private numero:Expresion
    constructor(numero:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.numero=numero
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const numero = this.numero.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (numero.tipo===Tipos.INT) {
            return {tipo: Tipos.DOUBLE,valor: Number(numero.valor)}
        }
        errores.agregar(new Error('Semantico',`No se puede convertir a decimal con un tipo ${numero.tipo}` ,this.linea,this.columna,entorno))
        consola.actualizar(`No se puede convertir a decimal con un tipo ${numero.tipo}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}