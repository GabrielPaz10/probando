"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class For extends instruccion_1.Instruccion {
    constructor(declaracion, condicion, paso, cuerpo, linea, columna) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.paso = paso;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var local = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        this.declaracion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'For');
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        this.verError(condicion, entorno);
        while (condicion.valor) {
            var localFor = new TablaSimbolos_1.TablaSimbolo(local.getSimbolos());
            const control = this.correrInstrucciones(tsGlobal, localFor, metodos, entorno + 'For');
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    this.paso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
            }
            this.paso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
            this.verError(condicion, entorno);
        }
    }
    correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    verError(condicion, entorno) {
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.For = For;
