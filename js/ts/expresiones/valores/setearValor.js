"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetearValor = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
class SetearValor extends expresion_1.Expresion {
    constructor(tipo, valor, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.tipo === Tipos_1.Tipos.STRING || this.tipo === Tipos_1.Tipos.CHAR) {
            const valor = this.valor.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\'/g, "\'").replace(/\\\\/g, "\\").replace(/\\"/g, "\"");
            return { tipo: this.tipo, valor: valor };
        }
        return { tipo: this.tipo, valor: this.valor };
    }
    ast(metodos) {
        return null;
    }
}
exports.SetearValor = SetearValor;
