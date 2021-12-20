import { consola, errores } from "../../index";
import { Expresion } from "../../abstractas/expresion";
import { Error } from "../../Reportes/Error";
import { TablaMetodos } from "../../Reportes/TablaMetodos";
import { TablaSimbolo } from "../../Reportes/TablaSimbolos";
import { Valor, Nodo } from "../../tiposD/Tipos";

export class ObtenerValor extends Expresion{
    private id:string
    constructor(id:string,linea:number,columna:number){
        super(linea,columna)
        this.id=id
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string): Valor {
        const valor = tsLocal.obtenerSimbolo(this.id)
        if (valor===null) {
            const valo= tsGlobal.obtenerSimbolo(this.id)
            if (valo===null) {
                errores.agregar(new Error('Semantico',`No se pudo encontrar la variale l:${this.linea} c:${this.columna}`,this.linea,this.columna,entorno))
                consola.actualizar(`No se pudo encontrar la variale l:${this.linea} c:${this.columna}\n`)
            }
            return {tipo:valo.tipo,valor:valo.valor}
        }
        return {tipo:valor.tipo,valor:valor.valor}
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby
        return null
    }
    
}