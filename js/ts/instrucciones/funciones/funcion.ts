import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos } from '../../tiposD/Tipos';
import { Parametros } from './parametros';
export class Funcion extends Instruccion{
    private tipo:Tipos
    private id:string
    private parametros:Parametros[]
    private cuerpo: Instruccion[]
    constructor(tipo:Tipos,id:string,parametros:Parametros[],cuerpo:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.tipo=tipo
        this.id=id
        this.parametros=parametros
        this.cuerpo=cuerpo
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        metodos.agregar(this.tipo,this.id,this.parametros,this.cuerpo)
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}