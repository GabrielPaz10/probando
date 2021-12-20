"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToInt = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class ToInt extends expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.expresion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo === Tipos_1.Tipos.DOUBLE || valor.tipo === Tipos_1.Tipos.BOOLEAN) {
            return { tipo: Tipos_1.Tipos.INT, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede Truncar con un tipo ${valor.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede Truncar con un tipo ${valor.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.ToInt = ToInt;
