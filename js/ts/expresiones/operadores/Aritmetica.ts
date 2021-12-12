import { Expresion } from '../../abstractas/expresion';
import { TablaSimbolo } from '../../Reportes/TablaSimbolos';
import { TablaMetodos } from '../../Reportes/TablaMetodos';
import { Valor, Tipos, Nodo } from '../../tiposD/Tipos';

export enum TipoOperacion{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    CONCATENACION
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
        return null
    }

    public ast(metodos:TablaMetodos):Nodo{
        return null
    }
    public tipoDominante(tipoIzquierdo:Tipos,tipoDerecho:Tipos,operador:TipoOperacion){
        switch (operador) {
            case TipoOperacion.SUMA:
                
            case TipoOperacion.RESTA:
                
            case TipoOperacion.MULTIPLICACION:
                if (tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.INT) {
                    return Tipos.INT
                }else if((tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.DOUBLE)
                ||(tipoIzquierdo===Tipos.DOUBLE&&tipoDerecho===Tipos.INT)
                ||(tipoIzquierdo===Tipos.INT&&tipoDerecho===Tipos.DOUBLE)){
                    return Tipos.DOUBLE
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
                    return Tipos.INT
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