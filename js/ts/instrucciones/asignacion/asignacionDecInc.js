"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionDecInc = exports.TipoAsignacion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
var TipoAsignacion;
(function (TipoAsignacion) {
    TipoAsignacion[TipoAsignacion["DECREMENTO"] = 0] = "DECREMENTO";
    TipoAsignacion[TipoAsignacion["INCREMENTO"] = 1] = "INCREMENTO";
})(TipoAsignacion = exports.TipoAsignacion || (exports.TipoAsignacion = {}));
class AsignacionDecInc extends instruccion_1.Instruccion {
    constructor(id, tipo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.setDI(simbolo, tsLocal, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.setDI(simbolo, tsGlobal, entorno);
            }
            else {
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se pudo encontrar la variable ${this.id}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se pudo encontrar la variable ${this.id} l:${this.linea}, c:${this.columna}\n`);
            }
        }
    }
    setDI(simbolo, ts, entorno) {
        if (simbolo.tipo === Tipos_1.Tipos.INT || simbolo.tipo === Tipos_1.Tipos.DOUBLE) {
            if (this.tipo === TipoAsignacion.DECREMENTO) {
                ts.actualizar(this.id, simbolo.valor - 1);
            }
            else if (this.tipo === TipoAsignacion.INCREMENTO) {
                ts.actualizar(this.id, simbolo.valor + 1);
            }
            return;
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El ${this.tipo} no se pudo realizar correctamente`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El ${this.tipo} no se pudo realizar correctamente l:${this.linea}, c:${this.columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.AsignacionDecInc = AsignacionDecInc;
