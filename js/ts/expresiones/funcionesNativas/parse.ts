import { consola, errores } from "../../index";
import { Expresion } from "../../abstractas/expresion";
import { Error } from "../../Reportes/Error";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';

export class Parse extends Expresion{
    private destino: Tipos
    private cadena:Expresion
    constructor(destino:Tipos,cadena:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.destino=destino
        this.cadena=cadena
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        if (this.destino===Tipos.INT || this.destino=== Tipos.DOUBLE||this.destino===Tipos.BOOLEAN) {
            const cadena = this.cadena.ejecutar(tsGlobal,tsLocal,metodos,entorno)
            if (cadena.tipo===Tipos.STRING) {
                switch(this.destino){
                    case Tipos.INT:
                        return {tipo:Tipos.INT,valor:(Number(cadena.valor))}
                    case Tipos.DOUBLE:
                        return {tipo:Tipos.DOUBLE,valor:(Number(cadena.valor))}
                    case Tipos.BOOLEAN:
                        if (cadena.valor=='1'||cadena.valor=='0') {
                            return {tipo:Tipos.BOOLEAN,valor:!!(Number(cadena.valor))}
                        }else if(cadena.valor=='true'||cadena.valor=='false'){
                            return {tipo:Tipos.BOOLEAN,valor: (cadena.valor=='true')?true:false}
                        }
                        
                }
            }
            errores.agregar(new Error('Semantico',`El tipo ${cadena.tipo} no puede usarse con PARSE` ,this.linea,this.columna,entorno))
            consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con PARSE\n`)
        }
        errores.agregar(new Error('Semantico',`El tipo ${this.destino} no puede usarse con PARSE` ,this.linea,this.columna,entorno))
        consola.actualizar(`El tipo ${this.destino} no puede usarse con PARSE\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}