import { consola, errores } from "../index";
import { Expresion } from "../abstractas/expresion";
import { Instruccion } from "../abstractas/instruccion";
import { Consola } from "../Reportes/Consola";
import { Error } from "../Reportes/Error";
import { TablaMetodos } from "../Reportes/TablaMetodos";
import { TablaSimbolo } from "../Reportes/TablaSimbolos";
import { Nodo, Tipos } from "../tiposD/Tipos";

export class Print extends Instruccion{
    private expresiones: Expresion[]|null
    private banderaS: boolean
    constructor(expresiones:Expresion[]|null, linea:number, columna:number,banderaS:boolean=false){
        super(linea,columna)
        this.expresiones=expresiones
        this.banderaS=banderaS
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        if (this.banderaS) {//si la bandera es verdadera, se imprime el salto (println)
            for (let index = 0; index < this.expresiones.length; index++) {
                if(this.expresiones[index] instanceof Expresion){
                    const valor= this.expresiones[index].ejecutar(tsGlobal,tsLocal,metodos,entorno)
                    if (valor.tipo===Tipos.ARRAY) {
                        consola.actualizar('[')
                        for(var i in valor.valor){
                            consola.actualizar(`${valor.valor[i].valor}, `)
                        }
                        consola.actualizar(']')
                    }else{
                        consola.actualizar(valor.valor)
                    }
                }else{
                    consola.actualizar('')
                }
            }
            consola.actualizar('\n')
        }else{//si no hay bandera no se imprime salto (print)
            for (let index = 0; index < this.expresiones.length; index++) {
                if(this.expresiones[index] instanceof Expresion){
                    const valor= this.expresiones[index].ejecutar(tsGlobal,tsLocal,metodos,entorno)
                    if (valor.tipo===Tipos.ARRAY) {
                        consola.actualizar('[')
                        for(var i in valor.valor){
                            consola.actualizar(`${valor.valor[i].valor}, `)
                        }
                        consola.actualizar(']')
                    }else{
                        consola.actualizar(valor.valor)
                    }
                    
                }else{
                    consola.actualizar('')
                }
            }
        }
    }
    public ast(metodos: TablaMetodos): Nodo {//hola aby 
        return null
    }
    
}