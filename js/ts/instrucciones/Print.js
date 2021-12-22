"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const index_1 = require("../index");
const expresion_1 = require("../abstractas/expresion");
const instruccion_1 = require("../abstractas/instruccion");
const Tipos_1 = require("../tiposD/Tipos");
class Print extends instruccion_1.Instruccion {
    constructor(expresiones, linea, columna, banderaS = false) {
        super(linea, columna);
        this.expresiones = expresiones;
        this.banderaS = banderaS;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.banderaS) { //si la bandera es verdadera, se imprime el salto (println)
            for (let index = 0; index < this.expresiones.length; index++) {
                if (this.expresiones[index] instanceof expresion_1.Expresion) {
                    const valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    if (valor.tipo === Tipos_1.Tipos.ARRAY) {
                        index_1.consola.actualizar('[');
                        for (var i in valor.valor) {
                            index_1.consola.actualizar(`${valor.valor[i].valor}, `);
                        }
                        index_1.consola.actualizar(']');
                    }
                    else {
                        index_1.consola.actualizar(valor.valor);
                    }
                }
                else {
                    index_1.consola.actualizar('');
                }
            }
            index_1.consola.actualizar('\n');
        }
        else { //si no hay bandera no se imprime salto (print)
            for (let index = 0; index < this.expresiones.length; index++) {
                if (this.expresiones[index] instanceof expresion_1.Expresion) {
                    const valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    if (valor.tipo === Tipos_1.Tipos.ARRAY) {
                        index_1.consola.actualizar('[');
                        for (var i in valor.valor) {
                            index_1.consola.actualizar(`${valor.valor[i].valor}, `);
                        }
                        index_1.consola.actualizar(']');
                    }
                    else {
                        index_1.consola.actualizar(valor.valor);
                    }
                }
                else {
                    index_1.consola.actualizar('');
                }
            }
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Print = Print;
