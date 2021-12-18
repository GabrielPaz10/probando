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
exports.Unario = exports.TUnario = void 0;
var expresion_1 = require("../../abstractas/expresion");
var Tipos_1 = require("../../tiposD/Tipos");
var index_1 = require("../../index");
var obtenerValor_1 = require("../valores/obtenerValor");
var Error_1 = require("../../Reportes/Error");
var TUnario;
(function (TUnario) {
    TUnario[TUnario["NEGATIVO"] = 0] = "NEGATIVO";
    TUnario[TUnario["INCREMENTO"] = 1] = "INCREMENTO";
    TUnario[TUnario["DECREMENTO"] = 2] = "DECREMENTO";
})(TUnario = exports.TUnario || (exports.TUnario = {}));
var Unario = /** @class */ (function (_super) {
    __extends(Unario, _super);
    function Unario(tipoUni, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipoUni = tipoUni;
        _this.valor = valor;
        return _this;
    }
    Unario.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        if (this.tipoUni !== TUnario.NEGATIVO && !(this.valor instanceof obtenerValor_1.ObtenerValor)) {
            index_1.errores.agregar(new Error_1.Error('Semantico', "Malos tipos para " + this.tipoUni + " l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
            index_1.consola.actualizar("Malos tipos para " + this.tipoUni + " l:" + this.linea + " c:" + this.columna + "\n");
        }
        var valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo == Tipos_1.Tipos.INT || valor.tipo == Tipos_1.Tipos.DOUBLE) {
            switch (this.tipoUni) {
                case TUnario.NEGATIVO:
                    return { tipo: valor.tipo, valor: (-valor.valor) };
                case TUnario.DECREMENTO:
                    return { tipo: valor.tipo, valor: (valor.valor - 1) };
                case TUnario.INCREMENTO:
                    return { tipo: valor.tipo, valor: (-valor.valor + 1) };
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', "Malos tipos para " + this.tipoUni + " l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
        index_1.consola.actualizar("Malos tipos para " + this.tipoUni + " l:" + this.linea + " c:" + this.columna + "\n");
    };
    Unario.prototype.ast = function (metodos) {
        return null;
    };
    return Unario;
}(expresion_1.Expresion));
exports.Unario = Unario;
