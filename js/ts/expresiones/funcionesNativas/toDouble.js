"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDouble = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class ToDouble extends expresion_1.Expresion {
    constructor(numero, linea, columna) {
        super(linea, columna);
        this.numero = numero;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const numero = this.numero.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (numero.tipo === Tipos_1.Tipos.INT) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: Number(numero.valor) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede convertir a decimal con un tipo ${numero.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede convertir a decimal con un tipo ${numero.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.ToDouble = ToDouble;
