"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arreglo = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const expresion_1 = require("../../abstractas/expresion");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
const Simbolo_1 = require("../../Reportes/Simbolo");
class Arreglo extends instruccion_1.Instruccion {
    constructor(id, tipo, tipo2, valor, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var aux = tsLocal.obtenerSimbolo(this.id);
        if (aux) {
            index_1.consola.actualizar(`La variable ${this.id} ya se encuentra definida, l:${this.linea}, c:${this.columna}\n`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `La variable ${this.id} ya se encuentra definida`, this.linea, this.columna, entorno));
        }
        let vector = [];
        if (this.valor instanceof expresion_1.Expresion) {
            vector = [];
        }
        else {
            this.declaracion2(tsGlobal, tsLocal, metodos, entorno, vector, this.valor);
        }
        let simbolo = new Simbolo_1.Simbolo(Tipos_1.Tipos.ARRAY, this.id, vector, entorno, "Arreglo");
        tsLocal.agregar(simbolo);
        index_1.simbolos.agregar(simbolo);
    }
    decdefecto(vector, size, entorno) {
        if (this.tipo !== this.tipo2 && this.tipo2 !== null) {
            this.ponerError(this.tipo2, this.tipo, entorno);
        }
        if (size.tipo !== Tipos_1.Tipos.INT) {
            this.ponerError(this.tipo, "INT", entorno);
        }
        vector = [];
        // for(var i=0;i<size.valor;i++){
        //     vector.push(this.valorDefecto(this.tipo))
        // }
    }
    declaracion2(tsGlobal, tsLocal, metodos, entorno, vector, expresion) {
        for (var i in expresion) {
            const aux = expresion[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            const valor = this.verificarTipo(this.tipo, aux, this.linea, this.columna, entorno);
            vector.push(valor);
        }
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
    ponerError(tipo1, tipo2, entorno) {
        index_1.consola.actualizar(`Tipos incompatibles: ${tipo1} no puede convertirse a ${tipo2}. l:${this.linea}, c:${this.columna}\n`);
        index_1.errores.agregar(new Error_1.Error('Semantico', `Tipos incompatibles: ${tipo1} no puede convertirse a ${tipo2}`, this.linea, this.columna, entorno));
    }
    ast(metodos) {
        return null;
    }
}
exports.Arreglo = Arreglo;
