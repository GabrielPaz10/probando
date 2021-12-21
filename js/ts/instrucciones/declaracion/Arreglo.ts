import { Instruccion } from '../../abstractas/instruccion';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { Nodo, Tipos, Valor } from '../../tiposD/Tipos';
import { Expresion } from '../../abstractas/expresion';
import { consola, errores, simbolos } from '../../index';
import { Error } from '../../Reportes/Error';
import { Simbolo } from '../../Reportes/Simbolo';
export class Arreglo extends Instruccion{
    private id:string
    private tipo:Tipos
    private tipo2:Tipos|null
    private valor :Expresion|Expresion[]|null
    
    constructor(id:string,tipo:Tipos,tipo2:Tipos|null,valor:Expresion|Expresion[]|null,fila:number,columna:number){
        super(fila,columna)
        this.id=id
        this.tipo=tipo
        this.tipo2= tipo2
        this.valor=valor
        
    }
    public ejecutar(tsGlobal: TablaSimbolo, tsLocal: TablaSimbolo, metodos: TablaMetodos, entorno: string) {
        var aux = tsLocal.obtenerSimbolo(this.id)
        if(aux){
            consola.actualizar(`La variable ${this.id} ya se encuentra definida, l:${this.linea}, c:${this.columna}\n`)
            errores.agregar(new Error('Semantico',`La variable ${this.id} ya se encuentra definida`,this.linea,this.columna,entorno))
        }
        let vector:Array<Valor>=[]
        
        if (this.valor instanceof Expresion) {
            vector=[]
        }else{
            this.declaracion2(tsGlobal,tsLocal,metodos,entorno,vector,this.valor)
        }
        let simbolo:Simbolo = new Simbolo(Tipos.ARRAY,this.id,vector,entorno,"Arreglo")
        tsLocal.agregar(simbolo)
        simbolos.agregar(simbolo)

    }

    private decdefecto(vector:Array<Valor>,size:Valor,entorno:string){
        if(this.tipo!== this.tipo2&& this.tipo2!==null){
            this.ponerError(this.tipo2,this.tipo,entorno)
        }
        if(size.tipo!==Tipos.INT){
            this.ponerError(this.tipo,"INT",entorno)
        }
        vector=[]
        // for(var i=0;i<size.valor;i++){
        //     vector.push(this.valorDefecto(this.tipo))
        // }
    }


    private declaracion2(tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string,vector:Array<Valor>,expresion:Expresion[]){
        for(var i in expresion){
            const aux = expresion[i].ejecutar(tsGlobal,tsLocal,metodos,entorno)
            const valor = this.verificarTipo(this.tipo,aux,this.linea,this.columna,entorno)
            vector.push(valor)
        }
    }

    public valorDefecto(tipo:Tipos):Valor{
        if (tipo===Tipos.INT) {
            return {tipo: Tipos.INT, valor:0}
        }else if(tipo===Tipos.DOUBLE){
            return {tipo: Tipos.DOUBLE,valor:0.0}
        }else if(tipo===Tipos.BOOLEAN){
            return {tipo:Tipos.BOOLEAN,valor:true}
        }else if(tipo===Tipos.CHAR){
            return {tipo:Tipos.CHAR,valor:'0'}
        }else if(tipo===Tipos.STRING){
            return {tipo:Tipos.STRING,valor:""}
        }
    }

    public verificarTipo(tipo:Tipos,valor:Valor,linea:number,columna:number,entorno:string){
        if (tipo===valor.tipo) {
            return valor
        }else if(tipo===Tipos.DOUBLE){
            if (valor.tipo===Tipos.INT) {
                return {tipo:tipo,valor: valor.valor}
            }
        }else if(tipo===Tipos.INT){
            if (valor.tipo===Tipos.BOOLEAN) {
                if (valor.valor===true) {
                    return {tipo:tipo,valor:1}
                }else if(valor.valor===false){
                    return {tipo:tipo,valor:0}
                }
            }else if(valor.tipo===Tipos.CHAR){
                return {tipo:tipo,valor:valor.valor.charCodeAt(0)}
            }else if(valor.tipo===Tipos.DOUBLE){
                return {tipo:tipo, valor:(valor.valor<0)?Math.ceil(valor.valor):Math.floor(valor.valor)}
            }
        }
        errores.agregar(new Error('Semantico',`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo}`,this.linea,this.columna,entorno))
        consola.actualizar(`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo} l:${this.linea}, c:${this.columna}\n`)
    }


    private ponerError(tipo1:string,tipo2:string,entorno:string){
        consola.actualizar(`Tipos incompatibles: ${tipo1} no puede convertirse a ${tipo2}. l:${this.linea}, c:${this.columna}\n` )
        errores.agregar(new Error('Semantico',`Tipos incompatibles: ${tipo1} no puede convertirse a ${tipo2}`,this.linea,this.columna,entorno))
    }
    public ast(metodos: TablaMetodos): Nodo {
        return null
    }
    
}