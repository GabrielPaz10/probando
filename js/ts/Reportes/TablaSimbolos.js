"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolo = void 0;
class TablaSimbolo {
    constructor(simbolos) {
        this.simbolos = [];
        this.simbolos = this.simbolos.concat(simbolos);
    }
    agregar(simbolo) {
        this.simbolos.push(simbolo);
    }
    obtenerSimbolo(id) {
        var simbolo = this.simbolos.filter((simb) => simb.id == id)[0];
        if (simbolo)
            return simbolo;
        else
            return null;
    }
    getSimbolos() {
        return this.simbolos;
    }
    actualizar(id, valor) {
        var simbolo = this.simbolos.filter((simb) => simb.id == id)[0];
        if (simbolo) {
            simbolo.valor = valor;
        }
        //ver si se pone mensaje de error
    }
}
exports.TablaSimbolo = TablaSimbolo;
