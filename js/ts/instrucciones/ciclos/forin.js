"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Simbolo_1 = require("../../Reportes/Simbolo");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class ForIn extends instruccion_1.Instruccion {
    constructor(iterador, iterando, cuerpo, linea, columna) {
        super(linea, columna);
        this.iterador = iterador;
        this.iterando = iterando;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var local = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        //var iterador = this.iterador.ejecutar(tsGlobal,tsLocal,metodos,entorno+'For')
        var iterando = this.iterando.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        local.agregar(new Simbolo_1.Simbolo(iterando.valor[0].tipo, this.iterador, 0, entorno + 'For'));
        for (var i = 0; i < iterando.valor.length; i++) {
            local.actualizar(this.iterador, i);
            var localFor = new TablaSimbolos_1.TablaSimbolo(local.getSimbolos());
            const control = this.correrInstrucciones(tsGlobal, localFor, metodos, entorno + 'For');
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
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
exports.ForIn = ForIn;
