"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class Asignacion extends instruccion_1.Instruccion {
    constructor(id, valor, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.actualizarValor(tsLocal, simbolo, valor, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.actualizarValor(tsGlobal, simbolo, valor, entorno);
            }
            else {
                index_1.errores.agregar(new Error_1.Error('Semantico', `Variable ${this.id} no declarada`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`Variable ${this.id} no declarada l:${this.linea}, c:${this.columna}\n`);
            }
        }
    }
    actualizarValor(ts, simbolo, valor, entorno) {
        const aux = this.verificarTipo(simbolo.tipo, valor, this.linea, this.columna, entorno);
        ts.actualizar(this.id, aux.valor);
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
exports.Asignacion = Asignacion;
