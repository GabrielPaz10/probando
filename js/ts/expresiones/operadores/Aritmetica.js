"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = exports.TipoOperacion = void 0;
var expresion_1 = require("../../abstractas/expresion");
var Tipos_1 = require("../../tiposD/Tipos");
var __1 = require("../..");
var Error_1 = require("../../Reportes/Error");
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
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(operacion, izquierdo, derecho, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.operacion = operacion;
        _this.izquierdo = izquierdo;
        _this.derecho = derecho;
        return _this;
    }
    Aritmetica.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var dere = this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var dominante = this.tipoDominante(izq.tipo, dere.tipo, this.operacion);
        switch (this.operacion) {
            case TipoOperacion.SUMA:
                switch (dominante) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(izq.valor) + Number(dere.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) + Number(dere.valor)) };
                    default:
                        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede sumar entre los tipos " + izq.tipo + " , " + dere.tipo, this.linea, this.columna, entorno));
                        __1.consola.actualizar("No se puede sumar entre los tipos " + izq.tipo + " , " + dere.tipo + " l:" + this.linea + " c:" + this.columna + " \n");
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
                        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede restar entre los tipos " + izq.tipo + " , " + dere.tipo, this.linea, this.columna, entorno));
                        __1.consola.actualizar("No se puede restar entre los tipos " + izq.tipo + " , " + dere.tipo + " l:" + this.linea + " c:" + this.columna + " \n");
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
                        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede Multiplicar entre los tipos " + izq.tipo + " , " + dere.tipo, this.linea, this.columna, entorno));
                        __1.consola.actualizar("No se puede multiplicar entre los tipos " + izq.tipo + " , " + dere.tipo + " l:" + this.linea + " c:" + this.columna + " \n");
                        break;
                }
                break;
            case TipoOperacion.DIVISION:
                if (dominante === Tipos_1.Tipos.DOUBLE) {
                    if (dere.valor != 0) {
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) / Number(dere.valor)) };
                    }
                    else {
                        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede dividir dentro de 0", this.linea, this.columna, entorno));
                        __1.consola.actualizar("No se puede dividir dentro de 0 l:" + this.linea + " c:" + this.columna + " \n");
                    }
                }
                __1.errores.agregar(new Error_1.Error('Semantico', "No se puede dividir con los tipos " + izq.tipo + " , " + dere.tipo, this.linea, this.columna, entorno));
                __1.consola.actualizar("No se puede dividir entre los tipos " + izq.tipo + " , " + dere.tipo + " l:" + this.linea + " c:" + this.columna + " \n");
                break;
            case TipoOperacion.MODULO:
                if (dominante === Tipos_1.Tipos.DOUBLE) {
                    return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) % Number(dere.valor)) };
                }
                __1.errores.agregar(new Error_1.Error('Semantico', "No se puede usar el modulo con los tipos " + izq.tipo + " , " + dere.tipo, this.linea, this.columna, entorno));
                __1.consola.actualizar("No se puede usar modulo entre los tipos " + izq.tipo + " , " + dere.tipo + " l:" + this.linea + " c:" + this.columna + " \n");
                break;
            case TipoOperacion.CONCATENACION:
                if (dominante === Tipos_1.Tipos.STRING) {
                    return { tipo: Tipos_1.Tipos.DOUBLE, valor: (izq.valor + dere.valor) };
                }
                __1.errores.agregar(new Error_1.Error('Semantico', "No se puede concatenar " + izq.tipo + " con " + dere.tipo, this.linea, this.columna, entorno));
                __1.consola.actualizar("No se puede concatenar entre los tipos " + izq.tipo + " , " + dere.tipo + " l:" + this.linea + " c:" + this.columna + " \n");
                break;
            case TipoOperacion.EXTE:
                if (dominante === Tipos_1.Tipos.STRING) {
                    if (izq.tipo === Tipos_1.Tipos.STRING && dere.tipo === Tipos_1.Tipos.INT) {
                        var concatena = '';
                        for (var index = 0; index < dere.valor; index++) {
                            concatena += izq.valor;
                        }
                        return { tipo: Tipos_1.Tipos.STRING, valor: concatena };
                    }
                }
                __1.errores.agregar(new Error_1.Error('Semantico', "No se puede concatenar " + izq.tipo + " con " + dere.tipo, this.linea, this.columna, entorno));
                __1.consola.actualizar("No se puede concatenar entre los tipos " + izq.tipo + " , " + dere.tipo + " l:" + this.linea + " c:" + this.columna + " \n");
                break;
        }
    };
    Aritmetica.prototype.ast = function (metodos) {
        return null;
    };
    Aritmetica.prototype.tipoDominante = function (tipoIzquierdo, tipoDerecho, operador) {
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
    };
    return Aritmetica;
}(expresion_1.Expresion));
exports.Aritmetica = Aritmetica;
