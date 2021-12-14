import { Expresion } from '../../abstractas/expresion';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { Valor, Tipos, Nodo } from '../../tiposD/Tipos';
import { v4 as uuidv4 } from 'uuid';

export enum TipoLogico{
    AND,
    NOT,
    OR
}

export class Logico extends Expresion{
    private tipo:TipoLogico
    private izquierdo:Expresion
    private derecho:Expresion|null

    constructor(type:TipoLogico, left:Expresion, right:Expresion|null, line:number, column:number){
        super(line,column);
        this.tipo = type
        this.izquierdo = left
        this.derecho = right
    }
    public ejecutar(tsGlobal:TablaSimbolo, tsLocal:TablaSimbolo, metodos:TablaMetodos, entorno:string):Valor{
        const izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno)
        const dere = this.getDer(tsGlobal, tsLocal, metodos, entorno)
  // this.setError(leftV.type, rightV.type)

        switch(this.tipo){
            case TipoLogico.AND:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor && dere.valor)}
            
            case TipoLogico.NOT:
                return {tipo: Tipos.BOOLEAN, valor:(!izq.valor)}

            case TipoLogico.OR:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor || dere.v4 as uuidv4)}
        }
    }
    private getDer(tsGlobal:TablaSimbolo, tsLocal:TablaSimbolo, metodos:TablaMetodos, entorno:string):Valor{
        if(this.derecho !== null && this.tipo !== TipoLogico.NOT){
            return this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno)
        }
        return {tipo: Tipos.NULL, valor: null}
        
    }
    
    private setError(izqT:Tipos, derT:Tipos){
        if(izqT !== Tipos.BOOLEAN && derT !== Tipos.BOOLEAN && this.tipo !== Tipos.NOT){
          //  output.setOutput(`-->Semántico, mala operación de tipos: ${TipoLogico[this.tipo]}, entre: ${Tipos[izqT]} y ${Tipos[derT]} (${this.linea}:${this.columna}).`)
            //throw new Error("Semántico", `Mala operación de tipos: ${TipoLogico[this.type]}, entre: ${Tipos[izqT]} y ${Tipos[derT]}.`, this.linea, this.columna)
        }
    }
    
    public ast(metodos:TablaMetodos):Nodo{
        const id = `n${uuidv4().replace(/\-/g, "")}`
        const izquierda = this.izquierdo.ast(metodos)
        let ast = `${id} [label="${this.getOperation()}"];
        ${izquierda.ast}
        ${id} -> ${izquierda.id};\n`

        if(this.derecho !== null){
            const derecha = this.derecho.ast(metodos)
            ast += `${derecha.ast}
            ${id} -> ${derecha.id};\n`
        }
        
        return {id: id, ast:ast}
    }
    
    private getOperation():string{
        switch(this.tipo){
            case TipoLogico.AND:
                return `And\\n&&`
            case TipoLogico.OR:
                return `Or\\n||`
            case TipoLogico.NOT:
                return `Not\\n!`
        }
    }


}