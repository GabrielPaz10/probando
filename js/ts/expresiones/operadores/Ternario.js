"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Ternario extends expresion_1.Expresion {
    constructor(condicion, verdadero, falso, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}\n`);
        }
        if (condicion.valor) {
            return this.verdadero.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        else {
            return this.falso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Ternario = Ternario;
