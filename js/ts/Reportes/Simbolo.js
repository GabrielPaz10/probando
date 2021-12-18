"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, id, valor, entorno, categoria) {
        if (categoria === void 0) { categoria = 'variable'; }
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
        this.entorno = entorno;
        this.categoria = categoria;
    }
    return Simbolo;
}());
exports.Simbolo = Simbolo;
