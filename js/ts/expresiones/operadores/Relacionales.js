"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = exports.TiposRelacional = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
var TiposRelacional;
(function (TiposRelacional) {
    TiposRelacional[TiposRelacional["MAYORI"] = 0] = "MAYORI";
    TiposRelacional[TiposRelacional["MENORI"] = 1] = "MENORI";
    TiposRelacional[TiposRelacional["DIFERENTE"] = 2] = "DIFERENTE";
    TiposRelacional[TiposRelacional["MAYOR"] = 3] = "MAYOR";
    TiposRelacional[TiposRelacional["IGUAL"] = 4] = "IGUAL";
    TiposRelacional[TiposRelacional["MENOR"] = 5] = "MENOR";
})(TiposRelacional = exports.TiposRelacional || (exports.TiposRelacional = {}));
class Relacional extends expresion_1.Expresion {
    constructor(relacion, izquierda, derecho, linea, columna) {
        super(linea, columna);
        this.relacion = relacion;
        this.izquierda = izquierda;
        this.derecho = derecho;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const izq = this.izquierda.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const dere = this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        switch (this.relacion) {
            case TiposRelacional.IGUAL:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor == dere.valor) };
            case TiposRelacional.DIFERENTE:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor != dere.valor) };
            case TiposRelacional.MAYOR:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor > dere.valor) };
            case TiposRelacional.MENOR:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor < dere.valor) };
            case TiposRelacional.MAYORI:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor >= dere.valor) };
            case TiposRelacional.MENORI:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor <= dere.valor) };
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Relacional = Relacional;
