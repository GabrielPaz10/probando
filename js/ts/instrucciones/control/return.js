"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
class Return extends instruccion_1.Instruccion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.valor === null) {
            return { tipo: Tipos_1.TiposControl.RETURN, valor: null, linea: this.linea, columna: this.columna };
        }
        const val = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        return { tipo: Tipos_1.TiposControl.RETURN, valor: val, linea: this.linea, columna: this.columna };
    }
    ast(metodos) {
        return null;
    }
}
exports.Return = Return;
