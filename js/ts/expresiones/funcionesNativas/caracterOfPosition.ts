import { consola, errores } from '../..';
import { Expresion } from '../../abstractas/expresion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class CaracterOfPosition extends Expresion{
    private cadena:Expresion
    private posicion:Expresion
    constructor(cadena:Expresion,posicion:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.cadena=cadena
        this.posicion=posicion
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const cadena = this.cadena.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (cadena.tipo===Tipos.STRING) {
            const posicion = this.posicion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
            if (posicion.tipo===Tipos.INT) {
                return {tipo: Tipos.STRING,valor: (cadena.valor.charAt(posicion.valor))}
            }
            errores.agregar(new Error('Semantico',`El tipo ${posicion.tipo} no puede ser un indice` ,this.linea,this.columna,entorno))
            consola.actualizar(`El tipo ${posicion.tipo} no puede ser un indice\n`)
        }
        errores.agregar(new Error('Semantico',`El tipo ${cadena.tipo} no puede usarse con caracterOfPosition` ,this.linea,this.columna,entorno))
            consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con caracterOfPosition\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}