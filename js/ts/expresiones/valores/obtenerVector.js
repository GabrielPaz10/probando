"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerVector = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class ObtenerVector extends expresion_1.Expresion {
    constructor(id, indice, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.indice = indice;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const indice = this.indice.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (indice.tipo !== Tipos_1.Tipos.INT && indice.tipo !== Tipos_1.Tipos.DOUBLE) {
            index_1.consola.actualizar(`El indice debe ser tipo Int, no tipo: ${indice.tipo}, linea: ${this.linea}, columna: ${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `El indice debe ser tipo Int, no tipo: ${indice.tipo}`, this.linea, this.columna, entorno));
        }
        var simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.verificarVector(simbolo.tipo, entorno);
            return this.obtenerValor(simbolo, indice.valor, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.verificarVector(simbolo.tipo, entorno);
                return this.obtenerValor(simbolo, indice.valor, entorno);
            }
            else {
                index_1.consola.actualizar(`No se pudo encontrar el simbolo: ${this.id}, linea: ${this.linea}, columna: ${this.columna}`);
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se pudo encontrar el simbolo: ${this.id}`, this.linea, this.columna, entorno));
            }
        }
    }
    verificarVector(tipo, entorno) {
        if (tipo !== Tipos_1.Tipos.ARRAY) {
            index_1.consola.actualizar(`Vector no encontrado, linea: ${this.linea},columna: ${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `Vector no encontrado`, this.linea, this.columna, entorno));
        }
    }
    obtenerValor(simbolo, indice, entorno) {
        let vector = simbolo.valor;
        if (indice < 0 || indice > vector.length) {
            index_1.consola.actualizar(`Indice fuera de rango, linea: ${this.linea},columna: ${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `Indice fuera de rango`, this.linea, this.columna, entorno));
            return;
        }
        return vector[indice];
    }
    ast(metodos) {
        return null;
    }
}
exports.ObtenerVector = ObtenerVector;
