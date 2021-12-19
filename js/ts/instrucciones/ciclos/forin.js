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
exports.ForIn = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var ForIn = /** @class */ (function (_super) {
    __extends(ForIn, _super);
    function ForIn(iterador, iterando, cuerpo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.iterador = iterador;
        _this.iterando = iterando;
        _this.cuerpo = cuerpo;
        return _this;
    }
    ForIn.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        throw new Error('Method not implemented.');
    };
    ForIn.prototype.correrInstrucciones = function (tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            var control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    };
    ForIn.prototype.ast = function (metodos) {
        return null;
    };
    return ForIn;
}(instruccion_1.Instruccion));
exports.ForIn = ForIn;
