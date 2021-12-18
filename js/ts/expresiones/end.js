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
exports.End = void 0;
var expresion_1 = require("../abstractas/expresion");
var Tipos_1 = require("../tiposD/Tipos");
var End = /** @class */ (function (_super) {
    __extends(End, _super);
    function End() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    End.prototype.ejecutar = function (tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.Intervalo.END, valor: Tipos_1.Intervalo.END };
    };
    End.prototype.ast = function (metodos) {
        return null;
    };
    return End;
}(expresion_1.Expresion));
exports.End = End;
