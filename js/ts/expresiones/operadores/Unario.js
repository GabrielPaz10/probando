"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = exports.TUnario = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const obtenerValor_1 = require("../valores/obtenerValor");
const Error_1 = require("../../Reportes/Error");
var TUnario;
(function (TUnario) {
    TUnario[TUnario["NEGATIVO"] = 0] = "NEGATIVO";
    TUnario[TUnario["INCREMENTO"] = 1] = "INCREMENTO";
    TUnario[TUnario["DECREMENTO"] = 2] = "DECREMENTO";
})(TUnario = exports.TUnario || (exports.TUnario = {}));
class Unario extends expresion_1.Expresion {
    constructor(tipoUni, valor, linea, columna) {
        super(linea, columna);
        this.tipoUni = tipoUni;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.tipoUni !== TUnario.NEGATIVO && !(this.valor instanceof obtenerValor_1.ObtenerValor)) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`);
        }
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo == Tipos_1.Tipos.INT || valor.tipo == Tipos_1.Tipos.DOUBLE) {
            switch (this.tipoUni) {
                case TUnario.NEGATIVO:
                    return { tipo: valor.tipo, valor: (-valor.valor) };
                case TUnario.DECREMENTO:
                    return { tipo: valor.tipo, valor: (valor.valor - 1) };
                case TUnario.INCREMENTO:
                    return { tipo: valor.tipo, valor: (-valor.valor + 1) };
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Unario = Unario;
