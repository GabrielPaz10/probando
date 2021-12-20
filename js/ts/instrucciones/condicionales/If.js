"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class If extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, elseC, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.elseC = elseC;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const condi = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (condi.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}\n`);
        }
        var control;
        if (condi.valor) {
            control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'If', this.cuerpo);
        }
        else if (this.elseC) {
            if (this.elseC instanceof instruccion_1.Instruccion) {
                control = this.elseC.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'Else');
            }
            else {
                control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'Else', this.elseC);
            }
        }
        if (control !== null && control !== undefined) {
            if (control.tipo === Tipos_1.TiposControl.RETURN) {
                return control;
            }
        }
    }
    ejecutarIns(tsGlobal, tsLocal, metodos, entorno, cuerpo) {
        var tslocal2 = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        for (var i in cuerpo) {
            const control = cuerpo[i].ejecutar(tsGlobal, tslocal2, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ast(metodos) {
        return null; //aun no implementado
    }
}
exports.If = If;
