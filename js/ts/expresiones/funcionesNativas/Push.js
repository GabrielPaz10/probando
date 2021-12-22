"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class Push extends expresion_1.Expresion {
    constructor(nombre, valor, linea, columna) {
        super(linea, columna);
        this.nombre = nombre;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var valor = tsLocal.obtenerSimbolo(this.nombre);
        if (!valor) {
            valor = tsGlobal.obtenerSimbolo(this.nombre);
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
        var nuevo = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var sacar = valor.valor.push(nuevo);
        return { tipo: sacar.tipo, valor: valor.valor.length };
    }
    ast(metodos) {
        return null;
    }
}
exports.Push = Push;
