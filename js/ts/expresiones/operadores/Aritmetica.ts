import { Expresion } from '../../abstractas/expresion';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { Valor, Tipos, Nodo, Intervalo } from '../../tiposD/Tipos';
import { consola, errores } from '../../index';
import { Error } from '../../Reportes/Error';

export enum TipoOperacion{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    CONCATENACION,
    EXTE
}
export class Aritmetica extends Expresion{

    private operacion:TipoOperacion
    private izquierdo:Expresion
    private derecho: Expresion

    constructor(operacion:TipoOperacion,izquierdo:Expresion,derecho:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.operacion=operacion
        this.izquierdo=izquierdo
        this.derecho=derecho
    }

    public  ejecutar(tsGlobal:TablaSimbolo,tsLocal:TablaSimbolo,metodos:TablaMetodos,entorno:string):Valor{
        let izq = this.izquierdo.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        let dere =this.derecho.ejecutar(tsGlobal,tsLocal,metodos,entorno)
        const dominante = this.tipoDominante(izq.tipo,dere.tipo,this.operacion)
        switch (this.operacion) {
            case TipoOperacion.SUMA:
                switch (dominante) {
                    case Tipos.INT:
                        return {tipo: Tipos.INT, valor: (Number(izq.valor) + Number(dere.valor))}
                    case Tipos.DOUBLE:
                        return {tipo: Tipos.DOUBLE, valor: (Number(izq.valor) + Number(dere.valor))}
                    default:
                        errores.agregar(new Error('Semantico',`No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo}` ,this.linea,this.columna,entorno))
                        consola.actualizar(`No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`)
                        break;
                }
                break;
            case TipoOperacion.RESTA:
                switch (dominante) {
                    case Tipos.INT:
                        return {tipo: Tipos.INT, valor: (Number(izq.valor) - Number(dere.valor))}
                    case Tipos.DOUBLE:
                        return {tipo: Tipos.DOUBLE, valor: (Number(izq.valor) - Number(dere.valor))}
                    default:
                        errores.agregar(new Error('Semantico',`No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo}` ,this.linea,this.columna,entorno))
                        consola.actualizar(`No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`)
                        break;
                }
                break
            case TipoOperacion.MULTIPLICACION:
                switch (dominante) {
                    case Tipos.INT:
                        return {tipo: Tipos.INT, valor: (Number(izq.valor) * Number(dere.valor))}
                    case Tipos.DOUBLE:
                        return {tipo: Tipos.DOUBLE, valor: (Number(izq.valor) * Number(dere.valor))}
                    default:
                        errores.agregar(new Error('Semantico',`No se puede Multiplicar entre los tipos ${izq.tipo} , ${dere.tipo}` ,this.linea,this.columna,entorno))
                        consola.actualizar(`No se puede multiplicar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`)
                        break;
                }
                break
            case TipoOperacion.DIVISION:
                if (dominante===Tipos.DOUBLE) {
                    if (dere.valor!=0) {
                        return {tipo: Tipos.DOUBLE, valor: (Number(izq.valor) / Number(dere.valor))}
                    }else{
                        errores.agregar(new Error('Semantico',`No se puede dividir dentro de 0` ,this.linea,this.columna,entorno))
                        consola.actualizar(`No se puede dividir dentro de 0 l:${this.linea} c:${this.columna} \n`)
                    }
                }
                errores.agregar(new Error('Semantico',`No se puede dividir con los tipos ${izq.tipo} , ${dere.tipo}` ,this.linea,this.columna,entorno))
                consola.actualizar(`No se puede dividir entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`)
                break
            case TipoOperacion.MODULO:
                if (dominante===Tipos.DOUBLE) {
                    return {tipo: Tipos.DOUBLE, valor: (Number(izq.valor) % Number(dere.valor))}
                }
                errores.agregar(new Error('Semantico',`No se puede usar el modulo con los tipos ${izq.tipo} , ${dere.tipo}` ,this.linea,this.columna,entorno))
                consola.actualizar(`No se puede usar modulo entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`)
                break
            case TipoOperacion.CONCATENACION:
                if (dominante===Tipos.STRING) {
                    return {tipo: Tipos.STRING, valor: (izq.valor +dere.valor)}
                }
                errores.agregar(new Error('Semantico',`No se puede concatenar ${izq.tipo} con ${dere.tipo}` ,this.linea,this.columna,entorno))
                consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`)
                break
            case TipoOperacion.EXTE:
                if (dominante===Tipos.STRING) {
                    if (izq.tipo===Tipos.STRING&&dere.tipo===Tipos.INT) {
                        let concatena= ''
                        for (let index = 0; index < dere.valor; index++) {
                            concatena+=izq.valor
                        }
                        return {tipo: Tipos.STRING, valor: concatena}
                    }
                }
                errores.agregar(new Error('Semantico',`No se puede concatenar ${izq.tipo} con ${dere.tipo}` ,this.linea,this.columna,entorno))
                consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`)
                break
        }
        
    }

    public ast(metodos:TablaMetodos):Nodo{
        return null
    }
    public tipoDominante(tipoIzquierdo:Tipos|Intervalo,tipoDerecho:Tipos|Intervalo,operador:TipoOperacion){
        switch (operador) {
            case TipoOperacion.SUMA:
                if (tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.INT) {
                    return Tipos.INT
                }else if((tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.INT)
                ||(tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.DOUBLE)){
                    return Tipos.DOUBLE
                }
                return null
            case TipoOperacion.RESTA:
                if (tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.INT) {
                    return Tipos.INT
                }else if((tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.INT)
                ||(tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.DOUBLE)){
                    return Tipos.DOUBLE
                }
                return null
            case TipoOperacion.MULTIPLICACION:
                if (tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.INT) {
                    return Tipos.INT
                }else if((tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.INT)
                ||(tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.DOUBLE)){
                    return Tipos.DOUBLE
                }
                return null
            case TipoOperacion.EXTE:
                if (tipoIzquierdo===Tipos.STRING&&tipoDerecho===Tipos.INT) {
                    return Tipos.STRING
                }
                return null
            case TipoOperacion.DIVISION:
                if ((tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.INT)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.INT)) {
                    return Tipos.DOUBLE
                }
                return null
            case TipoOperacion.MODULO:
                if ((tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.INT)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.INT)) {
                    return Tipos.DOUBLE
                }
                return null
            case TipoOperacion.CONCATENACION:
                if ((tipoIzquierdo===Tipos.STRING && tipoDerecho===Tipos.STRING)
                ||tipoIzquierdo===Tipos.CHAR && tipoDerecho===Tipos.CHAR
                ||tipoIzquierdo===Tipos.STRING && tipoDerecho===Tipos.CHAR
                ||tipoIzquierdo===Tipos.CHAR && tipoDerecho===Tipos.STRING) {
                    return Tipos.STRING
                }
                return null
        }
    }
}