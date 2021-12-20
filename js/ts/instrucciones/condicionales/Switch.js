"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class Switch extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, defa, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.defa = defa;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var control = this.ejecutarCase(condicion, tsGlobal, tsLocal, metodos, entorno);
        if (control === null) {
            control = this.ejecutarCuerpo(this.defa, tsGlobal, tsLocal, metodos, entorno);
        }
        if (control !== null) {
            if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                index_1.errores.agregar(new Error_1.Error('Sintactico', `Continue Fuera de un ciclo l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`Continue Fuera de un ciclo l:${this.linea} c:${this.columna}\n`);
            }
            else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                return control;
            }
        }
    }
    ejecutarCase(condicion, tsGlobal, tsLocal, metodos, entorno) {
        let flag = false;
        for (var i in this.cuerpo) {
            const valor = this.cuerpo[i].valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if ((valor.valor === condicion.valor) || flag) {
                flag = true;
                const control = this.ejecutarCuerpo(this.cuerpo[i].cuerpo, tsGlobal, tsLocal, metodos, entorno + 'case');
                if (control !== null) {
                    return control;
                }
            }
        }
        return null;
    }
    ejecutarCuerpo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
        var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        for (var i in cuerpo) {
            const control = cuerpo[i].ejecutar(tsGlobal, entornoLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ast(metodos) {
        return null;
    }
    obtenerCuerpo(metodos) { } //hola aby
}
exports.Switch = Switch;
