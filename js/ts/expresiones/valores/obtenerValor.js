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
exports.ObtenerValor = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var ObtenerValor = /** @class */ (function (_super) {
    __extends(ObtenerValor, _super);
    function ObtenerValor(id, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.id = id;
        return _this;
    }
    ObtenerValor.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var valor = tsLocal.obtenerSimbolo(this.id);
        if (valor === null) {
            var valo = tsGlobal.obtenerSimbolo(this.id);
            if (valo === null) {
                __1.errores.agregar(new Error_1.Error('Semantico', "No se pudo encontrar la variale l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
                __1.consola.actualizar("No se pudo encontrar la variale l:" + this.linea + " c:" + this.columna + "\n");
            }
            return { tipo: valo.tipo, valor: valo.valor };
        }
        return { tipo: valor.tipo, valor: valor.valor };
    };
    ObtenerValor.prototype.ast = function (metodos) {
        return null;
    };
    return ObtenerValor;
}(expresion_1.Expresion));
exports.ObtenerValor = ObtenerValor;
