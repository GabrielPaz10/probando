import { consola, errores } from "../../index";
import { Expresion } from "../../abstractas/expresion";
import { Instruccion } from '../../abstractas/instruccion';
import { Error } from "../../Reportes/Error";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Nodo, Tipos, Valor, TiposControl } from '../../tiposD/Tipos';

export class Dowhile extends Instruccion{
    private condicion:Expresion
    private cuerpo: Instruccion[]
    constructor(condicion:Expresion, cuerpo:Instruccion[],linea:number,columna:number){
        super(linea, columna)
        this.condicion=condicion
        this.cuerpo=cuerpo
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        var condicion = this.condicion.ejecutar(tsGlobal,tsLocal,metodos,entorno+'DoWhile')
        this.verError(condicion,entorno)
        do{
            var entornoLocal = new TablaSimbolo(tsLocal.getSimbolos())
            const control = this.correrInstrucciones(tsGlobal,entornoLocal,metodos,entorno+"DoWhile")
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
            this.verError(condicion,entorno)
        }while(condicion.valor)
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

    private verError(condicion:Valor,entorno:string){
        if (condicion.tipo!= Tipos.BOOLEAN) {
            consola.actualizar(`La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            errores.agregar(new Error('Semantico',`La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`,this.linea,this.columna, entorno))
        }
    }
    public ast(metodos: TablaMetodos): Nodo {//hola Aby
        return null
    }
    
}