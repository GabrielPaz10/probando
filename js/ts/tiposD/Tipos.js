"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposControl = exports.Intervalo = exports.Tipos = void 0;
var Tipos;
(function (Tipos) {
    Tipos[Tipos["INT"] = 0] = "INT";
    Tipos[Tipos["DOUBLE"] = 1] = "DOUBLE";
    Tipos[Tipos["BOOLEAN"] = 2] = "BOOLEAN";
    Tipos[Tipos["CHAR"] = 3] = "CHAR";
    Tipos[Tipos["STRING"] = 4] = "STRING";
    Tipos[Tipos["STRUCT"] = 5] = "STRUCT";
    Tipos[Tipos["NULL"] = 6] = "NULL";
    Tipos[Tipos["VOID"] = 7] = "VOID";
    Tipos[Tipos["ARRAY"] = 8] = "ARRAY";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
var Intervalo;
(function (Intervalo) {
    Intervalo[Intervalo["BEGIN"] = 0] = "BEGIN";
    Intervalo[Intervalo["END"] = 1] = "END";
})(Intervalo = exports.Intervalo || (exports.Intervalo = {}));
var TiposControl;
(function (TiposControl) {
    TiposControl[TiposControl["BREAK"] = 0] = "BREAK";
    TiposControl[TiposControl["RETURN"] = 1] = "RETURN";
    TiposControl[TiposControl["CONTINUE"] = 3] = "CONTINUE";
})(TiposControl = exports.TiposControl || (exports.TiposControl = {}));
