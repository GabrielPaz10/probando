"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaracterOfPosition = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class CaracterOfPosition extends expresion_1.Expresion {
    constructor(cadena, posicion, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
        this.posicion = posicion;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo === Tipos_1.Tipos.STRING) {
            const posicion = this.posicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (posicion.tipo === Tipos_1.Tipos.INT) {
                return { tipo: Tipos_1.Tipos.STRING, valor: (cadena.valor.charAt(posicion.valor)) };
            }
            index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${posicion.tipo} no puede ser un indice`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`El tipo ${posicion.tipo} no puede ser un indice\n`);
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no puede usarse con caracterOfPosition`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con caracterOfPosition\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.CaracterOfPosition = CaracterOfPosition;
