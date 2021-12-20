"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, id, valor, entorno, categoria = 'variable') {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
        this.entorno = entorno;
        this.categoria = categoria;
    }
}
exports.Simbolo = Simbolo;
