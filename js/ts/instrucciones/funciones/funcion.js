"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const index_1 = require("../../index");
const Simbolo_1 = require("../../Reportes/Simbolo");
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
        index_1.simbolos.agregar(new Simbolo_1.Simbolo(this.tipo, this.id, null, entorno, "Funcion"));
    }
    ast(metodos) {
        return null;
    }
}
exports.Funcion = Funcion;
