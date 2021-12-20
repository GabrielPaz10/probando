import { consola, errores } from '../../index';
import { Expresion } from '../../abstractas/expresion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos, Intervalo } from '../../tiposD/Tipos';
export class Substring extends Expresion{
    private cadena: Expresion
    private inicio:Expresion
    private final:Expresion
    constructor(cadena:Expresion,inicio:Expresion,final:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.cadena=cadena
        this.inicio=inicio
        this.final=final
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const cadena = this.cadena.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (cadena.tipo!==Tipos.STRING) {
            errores.agregar(new Error('Semantico',`El tipo ${cadena.tipo} no puede generar un substring` ,this.linea,this.columna,entorno))
            consola.actualizar(`El tipo ${cadena.tipo} no puede generar un substring\n`)
        }
        const inicio = this.inicio.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        const final= this.final.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if ((inicio.tipo==Tipos.DOUBLE||inicio.tipo==Tipos.INT||inicio.tipo==Intervalo.BEGIN)&&(final.tipo==Tipos.DOUBLE||final.tipo==Tipos.INT||final.tipo==Intervalo.END)) {
            
            switch (inicio.tipo) {
                case Tipos.DOUBLE:
                    switch (final.tipo) {
                        case Tipos.DOUBLE:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(inicio.valor,final.valor)}
                        case Tipos.INT:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(inicio.valor,final.valor)}
                        case Intervalo.END:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(inicio.valor,(cadena.valor.length+1))}
                    }
                    break
                case Tipos.INT:
                    switch (final.tipo) {
                        case Tipos.DOUBLE:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(inicio.valor,final.valor)}
                        case Tipos.INT:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(inicio.valor,final.valor)}
                        case Intervalo.END:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(inicio.valor,(cadena.valor.length+1))}
                    }
                    break
                case Intervalo.BEGIN:
                    switch (final.tipo) {
                        case Tipos.INT:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(0,final.valor)}
                        case Intervalo.END:
                            return {tipo:Tipos.STRING, valor: cadena.valor.substring(0,(cadena.valor.length+1))}
                    }
            }
        }
        errores.agregar(new Error('Semantico',`El tipo ${cadena.tipo} no es valido para un intervalo` ,this.linea,this.columna,entorno))
            consola.actualizar(`El tipo ${cadena.tipo} no es valido para un intervalo\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}