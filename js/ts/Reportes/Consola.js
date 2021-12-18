"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consola = void 0;
var Consola = /** @class */ (function () {
    function Consola() {
        this.consola = '';
    }
    Consola.prototype.actualizar = function (cadena) {
        this.consola += cadena;
    };
    Consola.prototype.limpiar = function () {
        this.consola = '';
    };
    Consola.prototype.publicar = function () {
        return this.consola;
    };
    return Consola;
}());
exports.Consola = Consola;
