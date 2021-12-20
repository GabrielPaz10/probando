"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class ForIn extends instruccion_1.Instruccion {
    constructor(iterador, iterando, cuerpo, linea, columna) {
        super(linea, columna);
        this.iterador = iterador;
        this.iterando = iterando;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        throw new Error('Method not implemented.');
    }
    correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ast(metodos) {
        return null;
    }
}
exports.ForIn = ForIn;
