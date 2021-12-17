import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos } from '../../tiposD/Tipos';
import { Simbolo } from '../../Reportes/Simbolo';
import { consola, errores } from '../..';
import { Error } from '../../Reportes/Error';
export enum TipoAsignacion{
    DECREMENTO,
    INCREMENTO
}
export class AsignacionDecInc extends Instruccion{
    private id:string
    private tipo:TipoAsignacion
    constructor(id:string,tipo:TipoAsignacion,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.tipo=tipo
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        var simbolo = tsLocal.obtenerSimbolo(this.id)
        if (simbolo) {
            this.setDI(simbolo,tsLocal,entorno)
        }else{
            simbolo = tsGlobal.obtenerSimbolo(this.id)
            if(simbolo){
                this.setDI(simbolo,tsGlobal,entorno)
            }else{
                errores.agregar(new Error('Semantico',`No se pudo encontrar la variable ${this.id}`,this.linea,this.columna,entorno))
                consola.actualizar(`No se pudo encontrar la variable ${this.id} l:${this.linea}, c:${this.columna}\n`)
            }
        }
    }
    private setDI(simbolo:Simbolo,ts:TablaSimbolo,entorno:string){
        if (simbolo.tipo===Tipos.INT || simbolo.tipo===Tipos.DOUBLE) {
            if (this.tipo===TipoAsignacion.DECREMENTO) {
                ts.actualizar(this.id, simbolo.valor-1)
            }else if(this.tipo===TipoAsignacion.INCREMENTO){
                ts.actualizar(this.id,simbolo.valor+1)
            }
            return;
        }
        errores.agregar(new Error('Semantico',`El ${this.tipo} no se pudo realizar correctamente`,this.linea,this.columna,entorno))
        consola.actualizar(`El ${this.tipo} no se pudo realizar correctamente l:${this.linea}, c:${this.columna}\n`)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}