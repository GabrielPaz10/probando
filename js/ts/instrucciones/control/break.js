"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
class Break extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.TiposControl.BREAK, linea: this.linea, columna: this.columna };
    }
    ast(metodos) {
        return null;
    }
}
exports.Break = Break;
