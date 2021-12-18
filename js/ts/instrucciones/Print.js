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
exports.Print = void 0;
var __1 = require("..");
var expresion_1 = require("../abstractas/expresion");
var instruccion_1 = require("../abstractas/instruccion");
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print(expresiones, linea, columna, banderaS) {
        if (banderaS === void 0) { banderaS = false; }
        var _this = _super.call(this, linea, columna) || this;
        _this.expresiones = expresiones;
        _this.banderaS = banderaS;
        return _this;
    }
    Print.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        if (this.banderaS) { //si la bandera es verdadera, se imprime el salto (println)
            for (var index = 0; index < this.expresiones.length; index++) {
                if (this.expresiones[index] instanceof expresion_1.Expresion) {
                    var valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    __1.consola.actualizar(valor.valor);
                }
                else {
                    __1.consola.actualizar('');
                }
            }
            __1.consola.actualizar('\n');
        }
        else { //si no hay bandera no se imprime salto (print)
            for (var index = 0; index < this.expresiones.length; index++) {
                if (this.expresiones[index] instanceof expresion_1.Expresion) {
                    var valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    __1.consola.actualizar(valor.valor);
                }
                else {
                    __1.consola.actualizar('');
                }
            }
        }
    };
    Print.prototype.ast = function (metodos) {
        return null;
    };
    return Print;
}(instruccion_1.Instruccion));
exports.Print = Print;
