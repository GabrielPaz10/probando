import { consola, errores } from "../..";
import { Expresion } from "../../abstractas/expresion";
import { Instruccion } from '../../abstractas/instruccion';
import { Error } from '../../Reportes/Error';
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Nodo, Valor, TiposControl } from '../../tiposD/Tipos';
import { Case } from "./Case";

export class Switch extends Instruccion{
    
    private condicion:Expresion
    private cuerpo:Case[]
    private defa:Instruccion[]
    constructor(condicion:Expresion,cuerpo:Case[],defa:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.condicion=condicion
        this.cuerpo=cuerpo
        this.defa=defa
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        const condicion = this.condicion.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        var control = this.ejecutarCase(condicion,tsGlobal,tsLocal,metodos,entorno)
        if (control===null) {
            control=this.ejecutarCuerpo(this.defa,tsGlobal,tsLocal,metodos,entorno)
        }
        if (control!==null) {
            if (control.tipo===TiposControl.CONTINUE) {
                errores.agregar(new Error('Sintactico',`Continue Fuera de un ciclo l:${this.linea} c:${this.columna}`,this.linea,this.columna,entorno))
                consola.actualizar(`Continue Fuera de un ciclo l:${this.linea} c:${this.columna}\n`)
            }else if(control.tipo===TiposControl.RETURN){
                return control
            }
        }
    }

    private ejecutarCase(condicion:Valor,tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string){
        let flag = false
        for(var i in this.cuerpo){
            const valor = this.cuerpo[i].valor.ejecutar(tsGlobal,tsLocal,metodos,entorno)
            if ((valor.valor===condicion.valor)||flag) {
                flag=true
                const control = this.ejecutarCuerpo(this.cuerpo[i].cuerpo,tsGlobal,tsLocal,metodos,entorno+'case')
                if (control!==null) {
                    return control
                }
            }
        }
        return null
    }
    private ejecutarCuerpo(cuerpo:Instruccion[],tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string){
        var entornoLocal= new TablaSimbolo(tsLocal.getSimbolos())
        for(var i in cuerpo){
            const control = cuerpo[i].ejecutar(tsGlobal,entornoLocal,metodos,entorno)
            if (control!==null&&control!==undefined) {
                return control
            }
        }
        return null
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby
        return null
    }
    private obtenerCuerpo(metodos:TablaMetodos){}//hola aby

}