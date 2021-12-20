import { Expresion } from '../../abstractas/expresion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Valor, Nodo, Tipos } from '../../tiposD/Tipos';
export class SetearValor extends Expresion{
    private tipo: Tipos
    private valor:any

    constructor(tipo:Tipos,valor:any,linea:number,columna:number){
        super(linea,columna)
        this.tipo=tipo
        this.valor=valor
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        if(this.tipo === Tipos.STRING || this.tipo === Tipos.CHAR){
            const valor = this.valor.replace(/\\n/g,"\n").replace(/\\t/g,"\t").replace(/\\'/g,"\'").replace(/\\\\/g,"\\").replace(/\\"/g,"\"")
            return {tipo: this.tipo, valor: valor}
        }
        
        return {tipo: this.tipo, valor: this.valor}
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby 
        return null
    }
    
}