"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class While extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'While');
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
        while (condicion.valor) {
            var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
            const control = this.correrInstrucciones(tsGlobal, entornoLocal, metodos, entorno + "While");
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
            }
            condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
                index_1.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
                index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            }
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
    ast(metodos) {
        return null;
    }
}
exports.While = While;
