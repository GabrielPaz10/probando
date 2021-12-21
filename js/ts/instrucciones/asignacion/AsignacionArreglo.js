"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionArreglo = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class AsignacionArreglo extends instruccion_1.Instruccion {
    constructor(id, indice, valor, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.indice = indice;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const indice = this.indice.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (indice.tipo !== Tipos_1.Tipos.INT && indice.tipo !== Tipos_1.Tipos.DOUBLE) {
            index_1.consola.actualizar(`El indice debe ser INT, no ${indice.tipo}, linea:${this.linea}, columna:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `El indice debe ser INT, no ${indice.tipo}`, this.linea, this.columna, entorno));
        }
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        let simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.revActualizar(tsLocal, simbolo, valor, indice.valor, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.revActualizar(tsGlobal, simbolo, valor, indice.valor, entorno);
            }
            else {
                index_1.consola.actualizar(`No se pudo encontrar el simbolo ${this.id}, linea:${this.linea} ,columna: ${this.columna}`);
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se pudo encontrar el simbolo ${this.id}`, this.linea, this.columna, entorno));
            }
        }
    }
    revActualizar(ts, simbolo, valor, indice, entorno) {
        let vector = simbolo.valor;
        if (simbolo.tipo !== Tipos_1.Tipos.ARRAY) {
            index_1.consola.actualizar(`No es un arreglo, no se puede acceder a la posicion, linea: ${this.linea}, columna:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `No es un arreglo, no se puede acceder a la posicion`, this.linea, this.columna, entorno));
            return;
        }
        this.verificarIndice(indice, vector, this.id, this.linea, this.columna, entorno);
        const aux = this.verificarTipo(vector[0].tipo, valor, this.linea, this.columna, entorno);
        vector[indice] = aux;
        ts.actualizar(this.id, vector);
        index_1.simbolos.actualizar(this.id, vector);
    }
    verificarIndice(indice, vector, id, linea, columna, entorno) {
        if (indice < 0 || indice > vector.length) {
            index_1.consola.actualizar(`Indice fuera de rango, linea: ${this.linea}, columna: ${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', ``, this.linea, this.columna, entorno));
        }
    }
    verificarTipo(tipo, valor, linea, columna, entorno) {
        if (tipo === valor.tipo) {
            return valor;
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            if (valor.tipo === Tipos_1.Tipos.INT) {
                return { tipo: tipo, valor: valor.valor };
            }
        }
        else if (tipo === Tipos_1.Tipos.INT) {
            if (valor.tipo === Tipos_1.Tipos.BOOLEAN) {
                if (valor.valor === true) {
                    return { tipo: tipo, valor: 1 };
                }
                else if (valor.valor === false) {
                    return { tipo: tipo, valor: 0 };
                }
            }
            else if (valor.tipo === Tipos_1.Tipos.CHAR) {
                return { tipo: tipo, valor: valor.valor.charCodeAt(0) };
            }
            else if (valor.tipo === Tipos_1.Tipos.DOUBLE) {
                return { tipo: tipo, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo} l:${this.linea}, c:${this.columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.AsignacionArreglo = AsignacionArreglo;
