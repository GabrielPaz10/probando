"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class Length extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo !== Tipos_1.Tipos.STRING && valor.tipo !== Tipos_1.Tipos.ARRAY) { //agregar lo de arreglos 
            index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede devolver LENGTH con un tipo ${valor.tipo}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`No se puede devolver LENGTH con un tipo ${valor.tipo}\n`);
        }
        return { tipo: Tipos_1.Tipos.INT, valor: ((valor.valor).length) };
    }
    ast(metodos) {
        return null;
    }
}
exports.Length = Length;
