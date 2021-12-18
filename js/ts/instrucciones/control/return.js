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
exports.Return = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var Tipos_1 = require("../../tiposD/Tipos");
var Return = /** @class */ (function (_super) {
    __extends(Return, _super);
    function Return(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Return.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        if (this.valor === null) {
            return { tipo: Tipos_1.TiposControl.RETURN, valor: null, linea: this.linea, columna: this.columna };
        }
        var val = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        return { tipo: Tipos_1.TiposControl.RETURN, valor: val, linea: this.linea, columna: this.columna };
    };
    Return.prototype.ast = function (metodos) {
        return null;
    };
    return Return;
}(instruccion_1.Instruccion));
exports.Return = Return;
