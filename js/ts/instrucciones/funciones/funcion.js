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
exports.Funcion = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(tipo, id, parametros, cuerpo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = tipo;
        _this.id = id;
        _this.parametros = parametros;
        _this.cuerpo = cuerpo;
        return _this;
    }
    Funcion.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        metodos.agregar(this.tipo, this.id, this.parametros, this.cuerpo);
    };
    Funcion.prototype.ast = function (metodos) {
        return null;
    };
    return Funcion;
}(instruccion_1.Instruccion));
exports.Funcion = Funcion;
