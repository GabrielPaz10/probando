"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.End = void 0;
const expresion_1 = require("../abstractas/expresion");
const Tipos_1 = require("../tiposD/Tipos");
class End extends expresion_1.Expresion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.Intervalo.END, valor: Tipos_1.Intervalo.END };
    }
    ast(metodos) {
        return null;
    }
}
exports.End = End;
