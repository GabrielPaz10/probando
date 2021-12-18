"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaError = void 0;
var TablaError = /** @class */ (function () {
    function TablaError() {
        this.errores = [];
    }
    TablaError.prototype.vaciar = function () {
        this.errores = [];
    };
    TablaError.prototype.agregar = function (error) {
        this.errores.push(error);
    };
    TablaError.prototype.get = function () {
        return this.errores;
    };
    return TablaError;
}());
exports.TablaError = TablaError;
