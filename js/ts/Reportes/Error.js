"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(tipo, descripcion, linea, columna, entorno) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
        this.entorno = entorno;
    }
    return Error;
}());
exports.Error = Error;
