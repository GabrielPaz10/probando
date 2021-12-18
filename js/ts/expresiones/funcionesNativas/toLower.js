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
exports.ToLowerCase = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var ToLowerCase = /** @class */ (function (_super) {
    __extends(ToLowerCase, _super);
    function ToLowerCase(cadena, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.cadena = cadena;
        return _this;
    }
    ToLowerCase.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo === Tipos_1.Tipos.STRING) {
            return { tipo: Tipos_1.Tipos.STRING, valor: (cadena.valor).toLowerCase() };
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "No se puede convertir a minusculas con el tipo " + cadena.tipo, this.linea, this.columna, entorno));
        __1.consola.actualizar("No se puede convertir a minusculas con el tipo " + cadena.tipo + "\n");
    };
    ToLowerCase.prototype.ast = function (metodos) {
        return null;
    };
    return ToLowerCase;
}(expresion_1.Expresion));
exports.ToLowerCase = ToLowerCase;
