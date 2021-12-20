"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Parse extends expresion_1.Expresion {
    constructor(destino, cadena, linea, columna) {
        super(linea, columna);
        this.destino = destino;
        this.cadena = cadena;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.destino === Tipos_1.Tipos.INT || this.destino === Tipos_1.Tipos.DOUBLE || this.destino === Tipos_1.Tipos.BOOLEAN) {
            const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (cadena.tipo === Tipos_1.Tipos.STRING) {
                switch (this.destino) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(cadena.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(cadena.valor)) };
                    case Tipos_1.Tipos.BOOLEAN:
                        if (cadena.valor == '1' || cadena.valor == '0') {
                            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: !!(Number(cadena.valor)) };
                        }
                        else if (cadena.valor == 'true' || cadena.valor == 'false') {
                            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (cadena.valor == 'true') ? true : false };
                        }
                }
            }
            index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no puede usarse con PARSE`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con PARSE\n`);
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${this.destino} no puede usarse con PARSE`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El tipo ${this.destino} no puede usarse con PARSE\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Parse = Parse;
