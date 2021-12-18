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
exports.Asignacion = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var Tipos_1 = require("../../tiposD/Tipos");
var __1 = require("../..");
var Error_1 = require("../../Reportes/Error");
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(id, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        _this.valor = valor;
        return _this;
    }
    Asignacion.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.actualizarValor(tsLocal, simbolo, valor, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.actualizarValor(tsGlobal, simbolo, valor, entorno);
            }
            else {
                __1.errores.agregar(new Error_1.Error('Semantico', "Variable " + this.id + " no declarada", this.linea, this.columna, entorno));
                __1.consola.actualizar("Variable " + this.id + " no declarada l:" + this.linea + ", c:" + this.columna + "\n");
            }
        }
    };
    Asignacion.prototype.actualizarValor = function (ts, simbolo, valor, entorno) {
        var aux = this.verificarTipo(simbolo.tipo, valor, this.linea, this.columna, entorno);
        ts.actualizar(this.id, aux.valor);
    };
    Asignacion.prototype.verificarTipo = function (tipo, valor, linea, columna, entorno) {
        if (tipo === valor.tipo) {
            return valor;
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            if (valor.tipo === Tipos_1.Tipos.INT) {
                return { tipo: tipo, valor: valor.valor };
            }
        }
        else if (tipo === Tipos_1.Tipos.INT) {
            if (valor.tipo === Tipos_1.Tipos.BOOLEAN) {
                if (valor.valor === true) {
                    return { tipo: tipo, valor: 1 };
                }
                else if (valor.valor === false) {
                    return { tipo: tipo, valor: 0 };
                }
            }
            else if (valor.tipo === Tipos_1.Tipos.CHAR) {
                return { tipo: tipo, valor: valor.valor.charCodeAt(0) };
            }
            else if (valor.tipo === Tipos_1.Tipos.DOUBLE) {
                return { tipo: tipo, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
            }
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "Tipos incompatibles, " + valor.tipo + " no se puede convertir a " + tipo, this.linea, this.columna, entorno));
        __1.consola.actualizar("Tipos incompatibles, " + valor.tipo + " no se puede convertir a " + tipo + " l:" + this.linea + ", c:" + this.columna + "\n");
    };
    Asignacion.prototype.ast = function (metodos) {
        return null;
    };
    return Asignacion;
}(instruccion_1.Instruccion));
exports.Asignacion = Asignacion;
