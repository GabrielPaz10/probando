"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringM = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class StringM extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo !== Tipos_1.Tipos.NULL) {
            return { tipo: Tipos_1.Tipos.STRING, valor: (valor.valor).toString() };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${valor.tipo} no puede convertirse a STRING`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El tipo ${valor.tipo} no puede convertirse a STRING\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.StringM = StringM;
