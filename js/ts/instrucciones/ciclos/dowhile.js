"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dowhile = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class Dowhile extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'DoWhile');
        this.verError(condicion, entorno);
        do {
            var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
            const control = this.correrInstrucciones(tsGlobal, entornoLocal, metodos, entorno + "DoWhile");
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
            this.verError(condicion, entorno);
        } while (condicion.valor);
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
            index_1.consola.actualizar(`La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Dowhile = Dowhile;
