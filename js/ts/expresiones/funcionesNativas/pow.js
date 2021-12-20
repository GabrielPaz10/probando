"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pow = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Pow extends expresion_1.Expresion {
    constructor(base, exponente, linea, columna) {
        super(linea, columna);
        this.base = base;
        this.exponente = exponente;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const base = this.base.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const exponente = this.exponente.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if ((base.tipo === Tipos_1.Tipos.INT && exponente.tipo === Tipos_1.Tipos.INT)) {
            return { tipo: Tipos_1.Tipos.INT, valor: (Math.pow(base.valor, exponente.valor)) };
        }
        else if ((base.tipo === Tipos_1.Tipos.DOUBLE && exponente.tipo === Tipos_1.Tipos.INT) ||
            (base.tipo === Tipos_1.Tipos.INT && exponente.tipo === Tipos_1.Tipos.DOUBLE)
            || (base.tipo === Tipos_1.Tipos.DOUBLE && exponente.tipo === Tipos_1.Tipos.DOUBLE)) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.pow(base.valor, exponente.valor)) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo} \n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Pow = Pow;
