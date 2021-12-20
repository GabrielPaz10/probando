"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Substring = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Substring extends expresion_1.Expresion {
    constructor(cadena, inicio, final, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
        this.inicio = inicio;
        this.final = final;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo !== Tipos_1.Tipos.STRING) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no puede generar un substring`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`El tipo ${cadena.tipo} no puede generar un substring\n`);
        }
        const inicio = this.inicio.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const final = this.final.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if ((inicio.tipo == Tipos_1.Tipos.INT || inicio.tipo == Tipos_1.Intervalo.BEGIN) && (final.tipo == Tipos_1.Tipos.INT || final.tipo == Tipos_1.Intervalo.END)) {
            switch (inicio.tipo) {
                case Tipos_1.Tipos.INT:
                    switch (final.tipo) {
                        case Tipos_1.Tipos.INT:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, final.valor) };
                        case Tipos_1.Intervalo.END:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, (cadena.valor.length + 1)) };
                    }
                case Tipos_1.Intervalo.BEGIN:
                    switch (final.tipo) {
                        case Tipos_1.Tipos.INT:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(0, final.valor) };
                        case Tipos_1.Intervalo.END:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(0, (cadena.valor.length + 1)) };
                    }
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no es valido para un intervalo`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El tipo ${cadena.tipo} no es valido para un intervalo\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Substring = Substring;
