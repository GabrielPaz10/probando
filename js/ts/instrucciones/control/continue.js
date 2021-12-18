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
exports.Continue = void 0;
var instruccion_1 = require("../../abstractas/instruccion");
var Tipos_1 = require("../../tiposD/Tipos");
var Continue = /** @class */ (function (_super) {
    __extends(Continue, _super);
    function Continue(linea, columna) {
        return _super.call(this, linea, columna) || this;
    }
    Continue.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.TiposControl.CONTINUE, linea: this.linea, columna: this.columna };
    };
    Continue.prototype.ast = function (metodos) {
        return null;
    };
    return Continue;
}(instruccion_1.Instruccion));
exports.Continue = Continue;
