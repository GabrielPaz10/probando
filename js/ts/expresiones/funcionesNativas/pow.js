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
exports.Pow = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var Pow = /** @class */ (function (_super) {
    __extends(Pow, _super);
    function Pow(base, exponente, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.base = base;
        _this.exponente = exponente;
        return _this;
    }
    Pow.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var base = this.base.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var exponente = this.exponente.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if ((base.tipo === Tipos_1.Tipos.INT && exponente.tipo === Tipos_1.Tipos.INT)) {
            return { tipo: Tipos_1.Tipos.INT, valor: (Math.pow(base.valor, exponente.valor)) };
        }
        else if ((base.tipo === Tipos_1.Tipos.DOUBLE && exponente.tipo === Tipos_1.Tipos.INT) ||
            (base.tipo === Tipos_1.Tipos.INT && exponente.tipo === Tipos_1.Tipos.DOUBLE)
            || (base.tipo === Tipos_1.Tipos.DOUBLE && exponente.tipo === Tipos_1.Tipos.DOUBLE)) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.pow(base.valor, exponente.valor)) };
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede elevar la base de tipo " + base.tipo + " con un exponente de tipo " + exponente.tipo, this.linea, this.columna, entorno));
        __1.consola.actualizar("No se puede elevar la base de tipo " + base.tipo + " con un exponente de tipo " + exponente.tipo + " \n");
    };
    Pow.prototype.ast = function (metodos) {
        return null;
    };
    return Pow;
}(expresion_1.Expresion));
exports.Pow = Pow;
