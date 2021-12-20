"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqrt = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Sqrt extends expresion_1.Expresion {
    constructor(raiz, linea, columna) {
        super(linea, columna);
        this.raiz = raiz;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const raiz = this.raiz.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (raiz.tipo === Tipos_1.Tipos.INT || raiz.tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.sqrt(raiz.valor)) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede calcular la raiz con el tipo ${raiz.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede calcular la raiz con el tipo ${raiz.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Sqrt = Sqrt;
