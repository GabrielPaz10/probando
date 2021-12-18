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
exports.Cos = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var Cos = /** @class */ (function (_super) {
    __extends(Cos, _super);
    function Cos(angulo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.angulo = angulo;
        return _this;
    }
    Cos.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (angulo.tipo === Tipos_1.Tipos.INT || angulo.tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.cos(angulo.valor)) };
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede calcular el coseno con el tipo " + angulo.tipo, this.linea, this.columna, entorno));
        __1.consola.actualizar("No se puede calcular el coseno con el tipo " + angulo.tipo + "\n");
    };
    Cos.prototype.ast = function (metodos) {
        return null;
    };
    return Cos;
}(expresion_1.Expresion));
exports.Cos = Cos;
