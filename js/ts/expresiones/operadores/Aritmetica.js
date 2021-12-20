"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = exports.TipoOperacion = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
var TipoOperacion;
(function (TipoOperacion) {
    TipoOperacion[TipoOperacion["SUMA"] = 0] = "SUMA";
    TipoOperacion[TipoOperacion["RESTA"] = 1] = "RESTA";
    TipoOperacion[TipoOperacion["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoOperacion[TipoOperacion["DIVISION"] = 3] = "DIVISION";
    TipoOperacion[TipoOperacion["MODULO"] = 4] = "MODULO";
    TipoOperacion[TipoOperacion["CONCATENACION"] = 5] = "CONCATENACION";
    TipoOperacion[TipoOperacion["EXTE"] = 6] = "EXTE";
})(TipoOperacion = exports.TipoOperacion || (exports.TipoOperacion = {}));
class Aritmetica extends expresion_1.Expresion {
    constructor(operacion, izquierdo, derecho, linea, columna) {
        super(linea, columna);
        this.operacion = operacion;
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        let izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        let dere = this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const dominante = this.tipoDominante(izq.tipo, dere.tipo, this.operacion);
        switch (this.operacion) {
            case TipoOperacion.SUMA:
                switch (dominante) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(izq.valor) + Number(dere.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) + Number(dere.valor)) };
                    default:
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                        break;
                }
                break;
            case TipoOperacion.RESTA:
                switch (dominante) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(izq.valor) - Number(dere.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) - Number(dere.valor)) };
                    default:
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                        break;
                }
                break;
            case TipoOperacion.MULTIPLICACION:
                switch (dominante) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(izq.valor) * Number(dere.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) * Number(dere.valor)) };
                    default:
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede Multiplicar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede multiplicar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                        break;
                }
                break;
            case TipoOperacion.DIVISION:
                if (dominante === Tipos_1.Tipos.DOUBLE) {
                    if (dere.valor != 0) {
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) / Number(dere.valor)) };
                    }
                    else {
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede dividir dentro de 0`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede dividir dentro de 0 l:${this.linea} c:${this.columna} \n`);
                    }
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede dividir con los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede dividir entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
            case TipoOperacion.MODULO:
                if (dominante === Tipos_1.Tipos.DOUBLE) {
                    return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) % Number(dere.valor)) };
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede usar el modulo con los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede usar modulo entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
            case TipoOperacion.CONCATENACION:
                if (dominante === Tipos_1.Tipos.STRING) {
                    return { tipo: Tipos_1.Tipos.STRING, valor: (izq.valor + dere.valor) };
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede concatenar ${izq.tipo} con ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
            case TipoOperacion.EXTE:
                if (dominante === Tipos_1.Tipos.STRING) {
                    if (izq.tipo === Tipos_1.Tipos.STRING && dere.tipo === Tipos_1.Tipos.INT) {
                        let concatena = '';
                        for (let index = 0; index < dere.valor; index++) {
                            concatena += izq.valor;
                        }
                        return { tipo: Tipos_1.Tipos.STRING, valor: concatena };
                    }
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede concatenar ${izq.tipo} con ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
        }
    }
    ast(metodos) {
        return null;
    }
    tipoDominante(tipoIzquierdo, tipoDerecho, operador) {
        switch (operador) {
            case TipoOperacion.SUMA:
                if (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.INT;
                }
                else if ((tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.RESTA:
                if (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.INT;
                }
                else if ((tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.MULTIPLICACION:
                if (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.INT;
                }
                else if ((tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.EXTE:
                if (tipoIzquierdo === Tipos_1.Tipos.STRING && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.STRING;
                }
                return null;
            case TipoOperacion.DIVISION:
                if ((tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.MODULO:
                if ((tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.CONCATENACION:
                if ((tipoIzquierdo === Tipos_1.Tipos.STRING && tipoDerecho === Tipos_1.Tipos.STRING)
                    || tipoIzquierdo === Tipos_1.Tipos.CHAR && tipoDerecho === Tipos_1.Tipos.CHAR
                    || tipoIzquierdo === Tipos_1.Tipos.STRING && tipoDerecho === Tipos_1.Tipos.CHAR
                    || tipoIzquierdo === Tipos_1.Tipos.CHAR && tipoDerecho === Tipos_1.Tipos.STRING) {
                    return Tipos_1.Tipos.STRING;
                }
                return null;
        }
    }
}
exports.Aritmetica = Aritmetica;
