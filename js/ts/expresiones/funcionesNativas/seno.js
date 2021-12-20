"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sin = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Sin extends expresion_1.Expresion {
    constructor(angulo, linea, columna) {
        super(linea, columna);
        this.angulo = angulo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (angulo.tipo === Tipos_1.Tipos.INT || angulo.tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.sin(angulo.valor)) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede calcular el coseno con el tipo ${angulo.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede calcular el coseno con el tipo ${angulo.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Sin = Sin;
