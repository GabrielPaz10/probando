import { Expresion } from '../../abstractas/expresion';
import { Simbolo } from '../../Reportes/Simbolo';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos, Intervalo } from '../../tiposD/Tipos';
import { consola, errores } from '../../index';
import { Error } from '../../Reportes/Error';
export class ObtenerVector extends Expresion{
    private id:string
    private indice:Expresion
    constructor(id:string,indice:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.indice=indice
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const indice = this.indice.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (indice.tipo!==Tipos.INT&&indice.tipo!==Tipos.DOUBLE) {
            consola.actualizar(`El indice debe ser tipo Int, no tipo: ${indice.tipo}, linea: ${this.linea}, columna: ${this.columna}`)
            errores.agregar(new Error('Semantico',`El indice debe ser tipo Int, no tipo: ${indice.tipo}`,this.linea,this.columna,entorno))
        }
        var simbolo = tsLocal.obtenerSimbolo(this.id)
        if (simbolo) {
            this.verificarVector(simbolo.tipo,entorno)
            return this.obtenerValor(simbolo,indice.valor,entorno)
        }else{
            simbolo= tsGlobal.obtenerSimbolo(this.id)
            if (simbolo) {
                this.verificarVector(simbolo.tipo,entorno)
                return this.obtenerValor(simbolo,indice.valor,entorno)
            }else{
                consola.actualizar(`No se pudo encontrar el simbolo: ${this.id}, linea: ${this.linea}, columna: ${this.columna}`)
                errores.agregar(new Error('Semantico',`No se pudo encontrar el simbolo: ${this.id}`,this.linea,this.columna,entorno))
            }
        }
    }

    private verificarVector(tipo:Tipos|Intervalo,entorno:string){
        if (tipo!== Tipos.ARRAY) {
            consola.actualizar(`Vector no encontrado, linea: ${this.linea},columna: ${this.columna}`)
            errores.agregar(new Error('Semantico',`Vector no encontrado`,this.linea,this.columna,entorno))
        }
    }


    private obtenerValor(simbolo:Simbolo,indice:number,entorno:string):Valor{
        let vector= simbolo.valor
        if (indice<0|| indice>vector.length) {
            consola.actualizar(`Indice fuera de rango, linea: ${this.linea},columna: ${this.columna}`)
            errores.agregar(new Error('Semantico',`Indice fuera de rango`,this.linea,this.columna,entorno))
            return
        }
        return vector[indice]
    }

    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}