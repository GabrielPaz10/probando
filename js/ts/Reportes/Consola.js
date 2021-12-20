"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consola = void 0;
class Consola {
    constructor() {
        this.consola = '';
    }
    actualizar(cadena) {
        this.consola += cadena;
    }
    limpiar() {
        this.consola = '';
    }
    publicar() {
        return this.consola;
    }
}
exports.Consola = Consola;
