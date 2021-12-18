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
exports.SetearValor = void 0;
var expresion_1 = require("../../abstractas/expresion");
var Tipos_1 = require("../../tiposD/Tipos");
var SetearValor = /** @class */ (function (_super) {
    __extends(SetearValor, _super);
    function SetearValor(tipo, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = tipo;
        _this.valor = valor;
        return _this;
    }
    SetearValor.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        if (this.tipo === Tipos_1.Tipos.STRING || this.tipo === Tipos_1.Tipos.CHAR) {
            var valor = this.valor.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\'/g, "\'").replace(/\\\\/g, "\\").replace(/\\"/g, "\"");
            return { tipo: this.tipo, valor: valor };
        }
        return { tipo: this.tipo, valor: this.valor };
    };
    SetearValor.prototype.ast = function (metodos) {
        return null;
    };
    return SetearValor;
}(expresion_1.Expresion));
exports.SetearValor = SetearValor;
