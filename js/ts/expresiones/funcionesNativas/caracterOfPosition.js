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
exports.CaracterOfPosition = void 0;
var __1 = require("../..");
var expresion_1 = require("../../abstractas/expresion");
var Error_1 = require("../../Reportes/Error");
var Tipos_1 = require("../../tiposD/Tipos");
var CaracterOfPosition = /** @class */ (function (_super) {
    __extends(CaracterOfPosition, _super);
    function CaracterOfPosition(cadena, posicion, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.cadena = cadena;
        _this.posicion = posicion;
        return _this;
    }
    CaracterOfPosition.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        var cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo === Tipos_1.Tipos.STRING) {
            var posicion = this.posicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (posicion.tipo === Tipos_1.Tipos.INT) {
                return { tipo: Tipos_1.Tipos.STRING, valor: (cadena.valor.charAt(posicion.valor)) };
            }
            __1.errores.agregar(new Error_1.Error('Semantico', "El tipo " + posicion.tipo + " no puede ser un indice", this.linea, this.columna, entorno));
            __1.consola.actualizar("El tipo " + posicion.tipo + " no puede ser un indice\n");
        }
        __1.errores.agregar(new Error_1.Error('Semantico', "El tipo " + cadena.tipo + " no puede usarse con caracterOfPosition", this.linea, this.columna, entorno));
        __1.consola.actualizar("El tipo " + cadena.tipo + " no puede usarse con caracterOfPosition\n");
    };
    CaracterOfPosition.prototype.ast = function (metodos) {
        return null;
    };
    return CaracterOfPosition;
}(expresion_1.Expresion));
exports.CaracterOfPosition = CaracterOfPosition;
