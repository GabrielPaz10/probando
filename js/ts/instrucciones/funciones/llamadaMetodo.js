"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaMetodo = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
const Simbolo_1 = require("../../Reportes/Simbolo");
class LlamadaMetodo extends instruccion_1.Instruccion {
    constructor(id, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const metodo = metodos.get(this.id);
        if (metodo) {
            if (metodo.tipo === Tipos_1.Tipos.VOID) {
                if (metodo.parametros.length === this.parametros.length) {
                    var tsLocal2 = this.obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno);
                    const control = this.ejecutarMetodo(metodo.cuerpo, tsGlobal, tsLocal2, metodos, entorno);
                    //para los retornos
                    if (control !== null && control !== undefined) {
                        if (control === Tipos_1.TiposControl.RETURN) {
                            if (control.valor === null) {
                                return;
                            }
                            this.ponerError(`No se puede retornar tipo: ${control.valor.tipo} en metodo VOID`, this.linea, this.columna, entorno);
                        }
                    }
                    return;
                }
                else if (metodo.parametros.length >= this.parametros.length) {
                    this.ponerError(`Hay menos parametros de los esperados`, this.linea, this.columna, entorno);
                }
                else {
                    this.ponerError(`Hay mas parametros de los esperados`, this.linea, this.columna, entorno);
                }
            }
            this.ponerError(`El metodo VOID no asignado de forma correcta`, this.linea, this.columna, entorno);
        }
        this.ponerError(`El metodo ${this.id} no se pudo encontrar`, this.linea, this.columna, entorno);
    }
    obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno) {
        var stLocal2 = new TablaSimbolos_1.TablaSimbolo([]);
        for (var i in this.parametros) {
            var valor = this.parametros[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo === metodo.parametros[i].tipo) {
                stLocal2.agregar(new Simbolo_1.Simbolo(valor.tipo, metodo.parametros[i].id, valor.valor, entorno));
            }
            else {
                this.ponerError(`El tipo ${valor.tipo} no coincide con el parametro`, this.linea, this.columna, entorno);
            }
        }
        return stLocal2;
    }
    ejecutarMetodo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
        for (var i in cuerpo) {
            const control = cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ponerError(mensaje, linea, columna, entorno) {
        index_1.errores.agregar(new Error_1.Error('Semantico', mensaje, linea, columna, entorno));
        index_1.consola.actualizar(mensaje + ` l: ${linea}, c: ${columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.LlamadaMetodo = LlamadaMetodo;
