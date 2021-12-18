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
exports.Length = void 0;
var expresion_1 = require("../../abstractas/expresion");
var Tipos_1 = require("../../tiposD/Tipos");
var index_1 = require("../../index");
var Error_1 = require("../../Reportes/Error");
var Length = /** @class */ (function (_super) {
    __extends(Length, _super);
    function Length(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Length.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo !== Tipos_1.Tipos.STRING) { //agregar lo de arreglos 
            index_1.errores.agregar(new Error_1.Error('Semantico', "No se puede devolver LENGTH con un tipo " + valor.tipo, this.linea, this.columna, entorno));
            index_1.consola.actualizar("No se puede devolver LENGTH con un tipo " + valor.tipo + "\n");
        }
        return { tipo: Tipos_1.Tipos.INT, valor: ((valor.valor).length) };
    };
    Length.prototype.ast = function (metodos) {
        return null;
    };
    return Length;
}(expresion_1.Expresion));
exports.Length = Length;
