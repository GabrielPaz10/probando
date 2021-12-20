"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
const Simbolo_1 = require("../../Reportes/Simbolo");
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, id, valor, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.id) {
            this.declarar(this.id[i], tsGlobal, tsLocal, metodos, entorno);
        }
    }
    declarar(id, tsGlobal, tsLocal, metodos, entorno) {
        const aux = tsLocal.obtenerSimbolo(id);
        if (aux) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `La variable ${id} ya esta definida`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`La variable ${id} ya esta definida l:${this.linea}, c:${this.columna}\n`);
        }
        var valor;
        if (this.valor) {
            valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        else {
            valor = this.valorDefecto(this.tipo);
        }
        valor = this.verificarTipo(this.tipo, valor, this.linea, this.columna, entorno);
        tsLocal.agregar(new Simbolo_1.Simbolo(this.tipo, id, valor.valor, entorno));
    }
    ast(metodos) {
        return null;
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
    valorDefecto(tipo) {
        if (tipo === Tipos_1.Tipos.INT) {
            return { tipo: Tipos_1.Tipos.INT, valor: 0 };
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: 0.0 };
        }
        else if (tipo === Tipos_1.Tipos.BOOLEAN) {
            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: true };
        }
        else if (tipo === Tipos_1.Tipos.CHAR) {
            return { tipo: Tipos_1.Tipos.CHAR, valor: '0' };
        }
        else if (tipo === Tipos_1.Tipos.STRING) {
            return { tipo: Tipos_1.Tipos.STRING, valor: "" };
        }
    }
}
exports.Declaracion = Declaracion;
