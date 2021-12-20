import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Nodo, Tipos, Valor, TiposControl } from '../../tiposD/Tipos';
import { Expresion } from '../../abstractas/expresion';
import { consola, errores } from '../../index';
import { Error } from '../../Reportes/Error';

export class If extends Instruccion{

    private condicion:Expresion
    private cuerpo:Instruccion[]
    private elseC:Instruccion[]
    constructor(condicion:Expresion,cuerpo:Instruccion[],elseC:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.condicion=condicion
        this.cuerpo=cuerpo
        this.elseC=elseC
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        const condi = this.condicion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        if (condi.tipo!= Tipos.BOOLEAN) {
            errores.agregar(new Error('Semantico',`La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}`,this.linea,this.columna,entorno))
            consola.actualizar(`La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}\n`)
        }
        var control
        if (condi.valor) {
            control= this.ejecutarIns(tsGlobal,tsLocal,metodos,entorno+'If',this.cuerpo)
        }else if(this.elseC){
            if (this.elseC instanceof Instruccion ) {
                control= this.elseC.ejecutar(tsGlobal,tsLocal,metodos,entorno+'Else')
            }else{
                control= this.ejecutarIns(tsGlobal,tsLocal,metodos,entorno+'Else',this.elseC)
            }
        }
        if (control!==null&&control!==undefined) {
            if (control.tipo===TiposControl.RETURN) {
                return control
            }
        }
    }
    private ejecutarIns(tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string,cuerpo:Instruccion[]):any{
        var tslocal2= new TablaSimbolo(tsLocal.getSimbolos())
        for(var i in cuerpo){
            const control = cuerpo[i].ejecutar(tsGlobal,tslocal2,metodos,entorno)
            if (control!==null && control!==undefined) {
                return control
            }
        }
        return null
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null//aun no implementado
    }

}