import { Expresion } from '../../abstractas/expresion';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { Valor, Tipos, Nodo, Intervalo } from '../../tiposD/Tipos';
import { consola, errores } from '../..';
import { Error } from '../../Reportes/Error';

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
        this.setError(izq.tipo, dere.tipo,entorno)

        switch(this.tipo){
            case TipoLogico.AND:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor && dere.valor)}
            
            case TipoLogico.NOT:
                return {tipo: Tipos.BOOLEAN, valor:(!izq.valor)}

            case TipoLogico.OR:
                return {tipo: Tipos.BOOLEAN, valor:(izq.valor || dere.valor)}
        }
    }
    private getDer(tsGlobal:TablaSimbolo, tsLocal:TablaSimbolo, metodos:TablaMetodos, entorno:string):Valor{
        if(this.derecho !== null && this.tipo !== TipoLogico.NOT){
            return this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno)
        }
        return {tipo: Tipos.NULL, valor: null}
        
    }
    
    private setError(izqT:Tipos|Intervalo, derT:Tipos|Intervalo,entorno:string){
        if(izqT !== Tipos.BOOLEAN && derT !== Tipos.BOOLEAN && this.tipo !== TipoLogico.NOT){
            consola.actualizar(`Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`);
            errores.agregar(new Error('Semantico',`Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`,this.linea,this.columna, entorno))
        }
    }
    public generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    
    public ast(metodos:TablaMetodos):Nodo{
        // const id = `n${uuidv4().replace(/\-/g, "")}`
        const id =this.generateUUID();
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