"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCase = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class ToLowerCase extends expresion_1.Expresion {
    constructor(cadena, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo === Tipos_1.Tipos.STRING) {
            return { tipo: Tipos_1.Tipos.STRING, valor: (cadena.valor).toLowerCase() };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede convertir a minusculas con el tipo ${cadena.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede convertir a minusculas con el tipo ${cadena.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.ToLowerCase = ToLowerCase;
