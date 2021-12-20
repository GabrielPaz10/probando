"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
class Typeof extends expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const expresion = this.expresion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        return { tipo: Tipos_1.Tipos.STRING, valor: (expresion.tipo) };
    }
    ast(metodos) {
        return null;
    }
}
exports.Typeof = Typeof;
