"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class Pop extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var valor = tsLocal.obtenerSimbolo(this.valor);
        if (!valor) {
            valor = tsGlobal.obtenerSimbolo(this.valor);
            if (!valor) {
                index_1.errores.agregar(new Error_1.Error('Semantico', `arreglo no encontrado ${valor.id}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`arreglo no encontrado: ${valor.id}, linea: ${this.linea}, columna: ${this.columna}\n`);
                return;
            }
        }
        if (valor.tipo !== Tipos_1.Tipos.ARRAY) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede quitar un elemento de un tipo: ${valor.tipo}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`No se puede quitar un elemento de un tipo: ${valor.tipo}, linea: ${this.linea}, columna: ${this.columna}\n`);
        }
        var sacar = valor.valor.pop();
        return { tipo: sacar.tipo, valor: sacar.valor };
    }
    ast(metodos) {
        return null;
    }
}
exports.Pop = Pop;
