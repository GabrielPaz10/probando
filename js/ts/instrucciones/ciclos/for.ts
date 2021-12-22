import { consola, errores } from "../../index";
import { Expresion } from "../../abstractas/expresion";
import { Instruccion } from '../../abstractas/instruccion';
import { Error } from "../../Reportes/Error";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Nodo, Valor, Tipos, TiposControl } from '../../tiposD/Tipos';

export class For extends Instruccion{
    private declaracion:Instruccion
    private condicion: Expresion
    private paso: Expresion
    private cuerpo: Instruccion[]
    constructor(declaracion:Expresion,condicion:Expresion, paso:Expresion,cuerpo:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.declaracion=declaracion
        this.condicion=condicion
        this.paso=paso
        this.cuerpo=cuerpo
    } 
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        var local = new TablaSimbolo(tsLocal.getSimbolos())
        this.declaracion.ejecutar(tsGlobal,local,metodos,entorno+'For')
        var condicion = this.condicion.ejecutar(tsGlobal,local,metodos,entorno)
        this.verError(condicion,entorno)
        while (condicion.valor) {
            var localFor = new TablaSimbolo(local.getSimbolos())
            const control = this.correrInstrucciones(tsGlobal,localFor,metodos,entorno+'For')
            if (control!==null) {
                if (control.tipo=== TiposControl.BREAK) {
                    break
                }else if(control.tipo=== TiposControl.CONTINUE){
                    this.paso.ejecutar(tsGlobal,tsLocal,metodos,entorno)
                    condicion= this.condicion.ejecutar(tsGlobal,localFor,metodos,entorno)
                    continue
                }else if(control.tipo=== TiposControl.RETURN){
                    return control
                }
            }
            this.paso.ejecutar(tsGlobal,localFor,metodos,entorno)
            condicion= this.condicion.ejecutar(tsGlobal,localFor,metodos,entorno)
            this.verError(condicion,entorno)
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
    private verError(condicion:Valor,entorno:string){
        if (condicion.tipo!= Tipos.BOOLEAN) {
            consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            errores.agregar(new Error('Semantico',`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`,this.linea,this.columna, entorno))
        }
    }

    public ast(metodos: TablaMetodos): Nodo {//hola aby
        return null
    }
    
}