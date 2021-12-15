import { consola, errores } from '../..';
import { Expresion } from '../../abstractas/expresion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class ToUpperCase extends Expresion{
    private cadena:Expresion
    constructor(cadena:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.cadena=cadena
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const cadena = this.cadena.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (cadena.tipo===Tipos.STRING) {
            return {tipo: Tipos.STRING,valor: (cadena.valor).toLowerCase()}
        }
        errores.agregar(new Error('Semantico',`No se puede convertir a mayusculas con el tipo ${cadena.tipo}` ,this.linea,this.columna,entorno))
        consola.actualizar(`No se puede convertir a mayusculas con el tipo ${cadena.tipo}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }

}