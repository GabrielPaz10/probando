"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaError = void 0;
class TablaError {
    constructor() {
        this.errores = [];
    }
    vaciar() {
        this.errores = [];
    }
    agregar(error) {
        this.errores.push(error);
    }
    get() {
        return this.errores;
    }
}
exports.TablaError = TablaError;
