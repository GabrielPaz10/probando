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
exports.Ternario = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var Ternario = /** @class */ (function (_super) {
    __extends(Ternario, _super);
    function Ternario(condicion, verdadero, falso, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.verdadero = verdadero;
        _this.falso = falso;
        return _this;
    }
    Ternario.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            __1.errores.agregar(new Error_1.Error('Semantico', "La condicion debe ser tipo Bool, no " + condicion.tipo + " l:" + this.linea + " c:" + this.columna, this.linea, this.columna, entorno));
            __1.consola.actualizar("La condicion debe ser tipo Bool, no " + condicion.tipo + " l:" + this.linea + " c:" + this.columna + "\n");
        }
        if (condicion.valor) {
            return this.verdadero.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        else {
            return this.falso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
    };
    Ternario.prototype.ast = function (metodos) {
        return null;
    };
    return Ternario;
}(expresion_1.Expresion));
exports.Ternario = Ternario;
