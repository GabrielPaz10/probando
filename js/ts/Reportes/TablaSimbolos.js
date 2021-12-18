"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolo = void 0;
var TablaSimbolo = /** @class */ (function () {
    function TablaSimbolo(simbolos) {
        this.simbolos = [];
        this.simbolos = this.simbolos.concat(simbolos);
    }
    TablaSimbolo.prototype.agregar = function (simbolo) {
        this.simbolos.push(simbolo);
    };
    TablaSimbolo.prototype.obtenerSimbolo = function (id) {
        var simbolo = this.simbolos.filter(function (simb) { return simb.id == id; })[0];
        if (simbolo)
            return simbolo;
        return null;
    };
    TablaSimbolo.prototype.getSimbolos = function () {
        return this.simbolos;
    };
    TablaSimbolo.prototype.actualizar = function (id, valor) {
        var simbolo = this.simbolos.filter(function (simb) { return simb.id == id; })[0];
        if (simbolo) {
            simbolo.valor = valor;
        }
        //ver si se pone mensaje de error
    };
    return TablaSimbolo;
}());
exports.TablaSimbolo = TablaSimbolo;
