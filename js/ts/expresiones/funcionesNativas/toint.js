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
exports.ToInt = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var ToInt = /** @class */ (function (_super) {
    __extends(ToInt, _super);
    function ToInt(expresion, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.expresion = expresion;
        return _this;
    }
    ToInt.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var valor = this.expresion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo === Tipos_1.Tipos.INT || valor.tipo === Tipos_1.Tipos.BOOLEAN) {
            return { tipo: Tipos_1.Tipos.INT, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede Truncar con un tipo " + valor.tipo, this.linea, this.columna, entorno));
        __1.consola.actualizar("No se puede Truncar con un tipo " + valor.tipo + "\n");
    };
    ToInt.prototype.ast = function (metodos) {
        return null;
    };
    return ToInt;
}(expresion_1.Expresion));
exports.ToInt = ToInt;
