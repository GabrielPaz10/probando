import { consola, errores } from '../..';
import { Expresion } from '../../abstractas/expresion';
import { Instruccion } from '../../abstractas/instruccion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos, TiposControl } from '../../tiposD/Tipos';
export class While extends Instruccion{
    private condicion:Expresion
    private cuerpo: Instruccion[]
    constructor(condicion:Expresion,cuerpo:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.condicion=condicion
        this.cuerpo=cuerpo
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        var condicion = this.condicion.ejecutar(tsGlobal,tsLocal,metodos,entorno+'While')
        if (condicion.tipo!= Tipos.BOOLEAN) {
            consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            errores.agregar(new Error('Semantico',`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`,this.linea,this.columna, entorno))
        }
        while(condicion.valor){
            var entornoLocal = new TablaSimbolo(tsLocal.getSimbolos())
            const control = this.correrInstrucciones(tsGlobal,entornoLocal,metodos,entorno+"While")
            if (control!==null) {
                if (control.tipo===TiposControl.BREAK) {
                    break
                }else if(control.tipo===TiposControl.CONTINUE){
                    condicion = this.condicion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
                    continue
                }else if(control.tipo===TiposControl.RETURN){
                    
                    return control 
                }
                
            }
            condicion = this.condicion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
            if (condicion.tipo!= Tipos.BOOLEAN) {
                consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
                errores.agregar(new Error('Semantico',`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`,this.linea,this.columna, entorno))
            }
        }
    }
    private correrInstrucciones(tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string):any{
        for(var i in this.cuerpo){
            const control = this.cuerpo[i].ejecutar(tsGlobal,tsLocal,metodos,entorno)
            if (control!==null && control !== undefined) {
                return control
            }
        }
        return null
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby 
        return null
    }
    
}