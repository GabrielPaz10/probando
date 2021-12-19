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
exports.StringM = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var StringM = /** @class */ (function (_super) {
    __extends(StringM, _super);
    function StringM(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    StringM.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo !== Tipos_1.Tipos.NULL) {
            return { tipo: Tipos_1.Tipos.STRING, valor: (valor.valor).toString() };
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "El tipo " + valor.tipo + " no puede convertirse a STRING", this.linea, this.columna, entorno));
        __1.consola.actualizar("El tipo " + valor.tipo + " no puede convertirse a STRING\n");
    };
    StringM.prototype.ast = function (metodos) {
        return null;
    };
    return StringM;
}(expresion_1.Expresion));
exports.StringM = StringM;
