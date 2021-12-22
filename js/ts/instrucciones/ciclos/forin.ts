import { Expresion } from '../../abstractas/expresion';
import { Instruccion } from '../../abstractas/instruccion';
import { Simbolo } from '../../Reportes/Simbolo';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, TiposControl } from '../../tiposD/Tipos';
export class ForIn extends Instruccion{
    private iterador:string
    private iterando:Expresion|any
    private cuerpo: Instruccion[]
    constructor(iterador:string,iterando:Expresion|any,cuerpo:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.iterador=iterador
        this.iterando=iterando
        this.cuerpo=cuerpo
    }

    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        var local = new TablaSimbolo(tsLocal.getSimbolos())
        
        //var iterador = this.iterador.ejecutar(tsGlobal,tsLocal,metodos,entorno+'For')
        var iterando = this.iterando.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        local.agregar(new Simbolo(iterando.valor[0].tipo,this.iterador,0,entorno+'For'))
        for (var i=0;i< iterando.valor.length;i++) {
            local.actualizar(this.iterador,i)
            var localFor = new TablaSimbolo(local.getSimbolos())
            const control = this.correrInstrucciones(tsGlobal,localFor,metodos,entorno+'For')
            if (control!==null) {
                if (control.tipo=== TiposControl.BREAK) {
                    break
                }else if(control.tipo=== TiposControl.CONTINUE){
                    continue
                }else if(control.tipo=== TiposControl.RETURN){
                    return control
                }
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

    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}