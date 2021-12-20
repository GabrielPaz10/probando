"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerValor = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
class ObtenerValor extends expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = tsLocal.obtenerSimbolo(this.id);
        if (valor === null) {
            const valo = tsGlobal.obtenerSimbolo(this.id);
            if (valo === null) {
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se pudo encontrar la variale l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se pudo encontrar la variale l:${this.linea} c:${this.columna}\n`);
            }
            return { tipo: valo.tipo, valor: valo.valor };
        }
        return { tipo: valor.tipo, valor: valor.valor };
    }
    ast(metodos) {
        return null;
    }
}
exports.ObtenerValor = ObtenerValor;
