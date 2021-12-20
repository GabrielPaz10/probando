"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Begin = void 0;
const expresion_1 = require("../abstractas/expresion");
const Tipos_1 = require("../tiposD/Tipos");
class Begin extends expresion_1.Expresion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.Intervalo.BEGIN, valor: Tipos_1.Intervalo.BEGIN };
    }
    ast(metodos) {
        return null;
    }
}
exports.Begin = Begin;
