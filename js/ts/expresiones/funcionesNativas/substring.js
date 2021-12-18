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
exports.Substring = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var Substring = /** @class */ (function (_super) {
    __extends(Substring, _super);
    function Substring(cadena, inicio, final, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.cadena = cadena;
        _this.inicio = inicio;
        _this.final = final;
        return _this;
    }
    Substring.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo !== Tipos_1.Tipos.STRING) {
            __1.errores.agregar(new Error_1.Error('Semantico', "El tipo " + cadena.tipo + " no puede generar un substring", this.linea, this.columna, entorno));
            __1.consola.actualizar("El tipo " + cadena.tipo + " no puede generar un substring\n");
        }
        var inicio = this.inicio.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var final = this.final.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if ((inicio.tipo == Tipos_1.Tipos.INT || inicio.tipo == Tipos_1.Intervalo.BEGIN) && (final.tipo == Tipos_1.Tipos.INT || final.tipo == Tipos_1.Intervalo.END)) {
            switch (inicio.tipo) {
                case Tipos_1.Tipos.INT:
                    switch (final.tipo) {
                        case Tipos_1.Tipos.INT:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, final.valor) };
                        case Tipos_1.Intervalo.END:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, (cadena.valor.length + 1)) };
                    }
                case Tipos_1.Intervalo.BEGIN:
                    switch (final.tipo) {
                        case Tipos_1.Tipos.INT:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(0, final.valor) };
                        case Tipos_1.Intervalo.END:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(0, (cadena.valor.length + 1)) };
                    }
            }
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "El tipo " + cadena.tipo + " no es valido para un intervalo", this.linea, this.columna, entorno));
        __1.consola.actualizar("El tipo " + cadena.tipo + " no es valido para un intervalo\n");
    };
    Substring.prototype.ast = function (metodos) {
        return null;
    };
    return Substring;
}(expresion_1.Expresion));
exports.Substring = Substring;
