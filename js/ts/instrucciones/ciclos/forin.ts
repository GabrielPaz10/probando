import { Expresion } from '../../abstractas/expresion';
import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo } from '../../tiposD/Tipos';
export class ForIn extends Instruccion{
    private iterador:Expresion
    private iterando:Expresion
    private cuerpo: Instruccion[]
    constructor(iterador:Expresion,iterando:Expresion,cuerpo:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.iterador=iterador
        this.iterando=iterando
        this.cuerpo=cuerpo
    }

    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        throw new Error('Method not implemented.');
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

    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}