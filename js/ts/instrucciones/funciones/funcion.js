"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Funcion extends instruccion_1.Instruccion {
    constructor(tipo, id, parametros, cuerpo, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        metodos.agregar(this.tipo, this.id, this.parametros, this.cuerpo);
    }
    ast(metodos) {
        return null;
    }
}
exports.Funcion = Funcion;
